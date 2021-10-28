using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MapExample.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Newtonsoft.Json;
using System.Text;

namespace MapExample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;

        public HomeController(ILogger<HomeController> logger, IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {


            return View();
        }

        public void SaveCoordinate(CoordinateInfo coordinateInfo) 
        {
            //var array = new[] { coordinateInfo };
            //String json = Newtonsoft.Json.JsonConvert.SerializeObject(array);
            string path = Path.Combine(Directory.GetCurrentDirectory(), "CoordinateFile\\");
            //// Write that JSON to txt file,  
            //var read = System.IO.File.ReadAllText(path + "output.json");
            //System.IO.File.AppendAllText(path + "coordinates.json", json);

            
            // Read existing json data
            var jsonData = System.IO.File.ReadAllText(path+"/coordinates.json");
            // De-serialize to object or create new list
            var coordinateList = JsonConvert.DeserializeObject<List<CoordinateInfo>>(jsonData)
                                  ?? new List<CoordinateInfo>();

            // Add any new employees
            coordinateList.Add(coordinateInfo);

            // Update json data string
            jsonData = JsonConvert.SerializeObject(coordinateList);
            //System.IO.File.WriteAllText(filePath, jsonData);
            //System.IO.File.AppendAllText(path + "coordinates.json", jsonData);
            System.IO.File.WriteAllText(path + "coordinates.json", jsonData);
        }

        public string GetData() 
        {
            StringBuilder sb = new StringBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "CoordinateFile\\");
            var jsonData = System.IO.File.ReadAllText(path + "/coordinates.json");
            var data = JsonConvert.DeserializeObject<List<CoordinateInfo>>(jsonData)
                                  ?? new List<CoordinateInfo>();
            sb.Append(string.Format(@"<div class=""container""><table class=""table""><thead>
                              <tr>
                                <th>İsim</th>
                                <th>Numara</th>
                                <th>Koordinatlar</th>
                              </tr>
                            </thead>
                            <tbody>"));

            foreach (var item in data)
            {
                sb.Append(string.Format("<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>",item.Name,item.Number,item.Coordinate));
            }

            sb.Append("</tbody></table></div>");

            return sb.ToString();
        }

        public JsonResult GetCoordinates()
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "CoordinateFile\\");
            var jsonData = System.IO.File.ReadAllText(path + "/coordinates.json");
            return Json(jsonData);
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
    }
}
