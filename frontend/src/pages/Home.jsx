import { useState } from "react";
import { 
  MapPin, 
  Cloud, 
  Droplets, 
  Thermometer, 
  Wind,
  Beaker,
  CloudRain,
  Sprout,
  Sparkles,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function CropRotationPlanner() {
  const [formData, setFormData] = useState({
    city: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [weather, setWeather] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchWeather = async () => {
    if (!formData.city) {
      alert("Please enter a city name");
      return;
    }

    setWeatherLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/get_weather?city=${formData.city}`);
      const data = await res.json();
      if (data.success) {
        setWeather(data);
        setFormData({
          ...formData,
          temperature: data.temperature,
          humidity: data.humidity,
          rainfall: data.rainfall,
        });
      } else {
        alert("Could not fetch weather: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formBody = new URLSearchParams(formData);
      const res = await fetch("${process.env.REACT_APP_API_URL}/recommend_crop", {
        method: "POST",
        body: formBody,
      });
      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommended_crop);
      } else {
        setRecommendation("Error: " + data.error);
      }
    } catch (err) {
      setRecommendation("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Modern Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Crop Planner
            </h1>
          </div>
          <nav className="hidden md:flex gap-2">
            <a href="#" className="px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 font-medium transition-colors">
              Home
            </a>
            <a href="/planner" className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium shadow-md">
              Recommendations
            </a>
            <a href="/guide" className="px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 font-medium transition-colors">
              Crop Guide
            </a>
          </nav>
        </div>
      </header>

      <div className="pt-24 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Smart Crop Recommendation
            </h2>
            <p className="text-gray-600 text-lg">
              Get personalized crop suggestions based on soil and weather conditions
            </p>
          </div>

          {/* Weather Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-blue-100 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Weather Data</h3>
                <p className="text-sm text-gray-600">Fetch current weather conditions</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city name..."
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
              <button
                onClick={fetchWeather}
                disabled={weatherLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {weatherLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Cloud className="w-5 h-5" />
                    Get Weather
                  </>
                )}
              </button>
            </div>

            {weather && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{weather.temperature}°C</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{weather.humidity}%</p>
                </div>
                <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-4 border border-sky-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CloudRain className="w-5 h-5 text-sky-600" />
                    <span className="text-sm font-medium text-gray-700">Rainfall</span>
                  </div>
                  <p className="text-2xl font-bold text-sky-600">{weather.rainfall}mm</p>
                </div>
              </div>
            )}
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Beaker className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Soil & Environmental Data</h3>
                <p className="text-sm text-gray-600">Enter field measurements for accurate recommendations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nitrogen */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  Nitrogen (N)
                </label>
                <input
                  type="number"
                  name="nitrogen"
                  required
                  value={formData.nitrogen}
                  onChange={handleChange}
                  placeholder="Enter nitrogen level"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Phosphorus */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Phosphorus (P)
                </label>
                <input
                  type="number"
                  name="phosphorus"
                  required
                  value={formData.phosphorus}
                  onChange={handleChange}
                  placeholder="Enter phosphorus level"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Potassium */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                  Potassium (K)
                </label>
                <input
                  type="number"
                  name="potassium"
                  required
                  value={formData.potassium}
                  onChange={handleChange}
                  placeholder="Enter potassium level"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Thermometer className="w-4 h-4 text-orange-600" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Enter temperature"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  required
                  value={formData.humidity}
                  onChange={handleChange}
                  placeholder="Enter humidity level"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {/* pH */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Beaker className="w-4 h-4 text-purple-600" />
                  pH Level
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="ph"
                  required
                  value={formData.ph}
                  onChange={handleChange}
                  placeholder="Enter pH level"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>

              {/* Rainfall */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CloudRain className="w-4 h-4 text-sky-600" />
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  required
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="Enter rainfall amount"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sprout className="w-6 h-6" />
                  Get Crop Recommendation
                </>
              )}
            </button>
          </form>

          {recommendation && (
            <div className="mt-6 animate-slide-up">
              {recommendation.startsWith("Error") ? (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-800 mb-1">Error Occurred</h4>
                    <p className="text-red-700">{recommendation}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Sprout className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-100">Recommended Crop</p>
                      <h3 className="text-3xl font-bold">{recommendation}</h3>
                    </div>
                  </div>
                  <p className="text-green-50">
                    Based on your soil and weather conditions, this crop is optimal for your field.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}