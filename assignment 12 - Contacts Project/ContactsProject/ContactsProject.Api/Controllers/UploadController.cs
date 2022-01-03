using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using ContactsApp.Data.Services;
using DocumentFormat.OpenXml.Packaging;

namespace ContactsProject.Api.Controllers
{
    public class UploadController : ApiController
    {
        UploadContacts uploadcontacts;

        public UploadController(ICountryData dbCountryService,
            IStatesData dbStateService,
            IContactData dbContactService)
        {
            uploadcontacts = new UploadContacts(dbCountryService, dbStateService, dbContactService);
        }
        public HttpResponseMessage GetSampleExcelSheeet()
        {
            try
            {
                var stream = uploadcontacts.CreateExcelSheet();
                stream.Seek(0, SeekOrigin.Begin);
                return CreateAResponseFromFileStream(stream);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message)
                };
            }

        }

        HttpResponseMessage CreateAResponseFromFileStream(Stream stream)
        {
            stream.Seek(0, SeekOrigin.Begin);
            var response = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(stream)
            };
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.Content.Headers.ContentLength = stream.Length;
            response.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = "Upload Contact Sample Sheet.xlsx"
                };
            return response;
        }
       
        public HttpResponseMessage PostContactsFromExcelSheet()
        {
            var httpPostedFile = HttpContext.Current.Request.Files[0];
            var memoryStream = new MemoryStream();
            httpPostedFile.InputStream.CopyTo(memoryStream);
            try
            {
                using (var document = SpreadsheetDocument.Open(memoryStream, true))
                {
                    uploadcontacts.ValidateExcelSheetAndUploadValidContacts(document);
                    memoryStream.Seek(0, SeekOrigin.Begin);
                    var response = CreateAResponseFromFileStream(memoryStream);
                    
                    return response;
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message)
                };
            }
            finally
            {
                memoryStream.Flush();
            }
        }

        bool CheckIfFileReady(string filePath)
        {
            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Open))
                {
                    fileStream.Close();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
