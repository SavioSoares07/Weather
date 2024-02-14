using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using Weather.Models;
using Microsoft.Extensions.Http;

namespace Weather.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _httpClient;

        public HomeController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public async Task<IActionResult> SearchResult(string city)
        {
            string APIKey = "d67102341292b32a73343ae87f4189b6";
            string APIUrl = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}";

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(APIUrl);
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();

                    // Retorne os dados da resposta da API do OpenWeatherMap como JSON
                    return Content(responseBody, "application/json");
                }
                else
                {
                    // Se a solicitação não for bem-sucedida, retorne um erro ou uma mensagem adequada
                    return BadRequest("Falha ao obter dados da cidade");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exceção durante o processamento da solicitação HTTP: " + ex.Message);
                // Retorne uma resposta de erro adequada
                return StatusCode(500, "Ocorreu um erro durante o processamento da solicitação HTTP.");
            }
        }

    }
}
