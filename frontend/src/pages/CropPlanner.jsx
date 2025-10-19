import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Sprout, Droplet, Thermometer, Calendar, Leaf, TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const cropData = {
  Rice: {
    info: "Rice requires high water availability and warm temperatures.",
    next: "Legumes",
    yield: 80,
    soil: "Clayey",
    water: "High",
    temperature: "20-35",
    time: 4,
    alternatives: ["Wheat", "Barley"],
    companion: "Azolla",
    nutrients: [50, 30, 20],
  },
  Orange: {
    info: "Orange trees grow best in warm, subtropical to tropical climates with well-drained soil.",
    next: "Legumes",
    yield: 50,
    soil: "Sandy Loam",
    water: "Medium",
    temperature: "15-30",
    time: 8,
    alternatives: ["Lemon", "Mango"],
    companion: "Basil",
    nutrients: [30, 40, 30],
  },
  Papaya: {
    info: "Papaya prefers warm temperatures, well-drained soil, and good sunlight exposure.",
    next: "Leafy Greens",
    yield: 70,
    soil: "Loamy",
    water: "Medium-High",
    temperature: "22-32",
    time: 6,
    alternatives: ["Banana", "Pineapple"],
    companion: "Marigold",
    nutrients: [35, 40, 25]
  },
  Coffee: {
    info: "Coffee grows best in cool, tropical highlands with rich, well-drained soil.",
    next: "Legumes",
    yield: 45,
    soil: "Volcanic Loam",
    water: "High",
    temperature: "15-28",
    time: 12,
    alternatives: ["Cocoa", "Tea"],
    companion: "Chili",
    nutrients: [50, 30, 20]
  },
  Maize: {
    info: "Maize requires well-drained soil and moderate rainfall.",
    next: "Legumes",
    yield: 70,
    soil: "Loamy",
    water: "Medium",
    temperature: "18-30",
    time: 3,
    alternatives: ["Barley", "Sorghum"],
    companion: "Mung Bean",
    nutrients: [40, 35, 25]
  },
  Chickpea: {
    info: "Chickpea grows well in dry, well-drained soil with low moisture.",
    next: "Wheat",
    yield: 55,
    soil: "Sandy Loam",
    water: "Low",
    temperature: "10-25",
    time: 2,
    alternatives: ["Lentil", "Pigeon Peas"],
    companion: "Pigeon Peas",
    nutrients: [30, 40, 30]
  },
  Kidneybeans: {
    info: "Kidney beans require warm temperatures and moderate water supply.",
    next: "Cereal Crops",
    yield: 60,
    soil: "Loamy",
    water: "Medium",
    temperature: "15-30",
    time: 3,
    alternatives: ["Black Gram", "Lentil"],
    companion: "Maize",
    nutrients: [35, 40, 25]
  },
  Pigeonpeas: {
    info: "Pigeon peas grow well in semi-arid regions with minimal water requirements.",
    next: "Cereals",
    yield: 50,
    soil: "Sandy Loam",
    water: "Low",
    temperature: "15-35",
    time: 4,
    alternatives: ["Chickpea", "Lentil"],
    companion: "Sorghum",
    nutrients: [30, 45, 25]
  },
  Mothbeans: {
    info: "Moth beans are drought-resistant and suitable for arid regions.",
    next: "Maize",
    yield: 45,
    soil: "Sandy",
    water: "Low",
    temperature: "20-35",
    time: 2,
    alternatives: ["Cowpea", "Lentil"],
    companion: "Sorghum",
    nutrients: [25, 40, 35]
  },
  Mungbean: {
    info: "Mung beans fix nitrogen and improve soil fertility.",
    next: "Cereals",
    yield: 55,
    soil: "Loamy",
    water: "Low",
    temperature: "15-35",
    time: 2,
    alternatives: ["Lentil", "Chickpea"],
    companion: "Maize",
    nutrients: [35, 40, 25]
  },
  Blackgram: {
    info: "Black gram is a nitrogen-fixing crop, beneficial for soil enrichment.",
    next: "Cereal Crops",
    yield: 50,
    soil: "Sandy Loam",
    water: "Medium",
    temperature: "20-30",
    time: 2,
    alternatives: ["Kidney Beans", "Chickpea"],
    companion: "Maize",
    nutrients: [40, 35, 25]
  },
  Lentil: {
    info: "Lentils grow well in cool temperatures and well-drained soil.",
    next: "Wheat",
    yield: 60,
    soil: "Loamy",
    water: "Low",
    temperature: "10-25",
    time: 3,
    alternatives: ["Chickpea", "Pigeon Peas"],
    companion: "Barley",
    nutrients: [35, 40, 25]
  },
  Pomegranate: {
    info: "Pomegranates require well-drained soil and moderate water.",
    next: "Legumes",
    yield: 75,
    soil: "Sandy Loam",
    water: "Medium",
    temperature: "15-35",
    time: 5,
    alternatives: ["Grapes", "Mango"],
    companion: "Marigold",
    nutrients: [30, 40, 30]
  },
  Banana: {
    info: "Bananas require high humidity and rich, fertile soil.",
    next: "Legumes",
    yield: 90,
    soil: "Clay Loam",
    water: "High",
    temperature: "25-35",
    time: 6,
    alternatives: ["Mango", "Papaya"],
    companion: "Coconut",
    nutrients: [50, 30, 20]
  },
  Mango: {
    info: "Mango trees require warm temperatures and deep, well-drained soil.",
    next: "Legumes",
    yield: 85,
    soil: "Loamy",
    water: "Medium",
    temperature: "20-35",
    time: 7,
    alternatives: ["Pomegranate", "Banana"],
    companion: "Lemon",
    nutrients: [35, 40, 25]
  },
  Grapes: {
    info: "Grapes thrive in well-drained soil with moderate water supply.",
    next: "Legumes",
    yield: 70,
    soil: "Loamy",
    water: "Medium",
    temperature: "15-30",
    time: 5,
    alternatives: ["Pomegranate", "Apple"],
    companion: "Olive",
    nutrients: [40, 30, 30]
  },
  Watermelon: {
    info: "Watermelons need warm temperatures and sandy or loamy soil.",
    next: "Cereal Crops",
    yield: 80,
    soil: "Sandy Loam",
    water: "Medium-High",
    temperature: "20-35",
    time: 4,
    alternatives: ["Muskmelon", "Pumpkin"],
    companion: "Corn",
    nutrients: [35, 35, 30]
  },
  Muskmelon: {
    info: "Muskmelons grow best in warm climates and sandy soil with good drainage.",
    next: "Legumes",
    yield: 75,
    soil: "Sandy Loam",
    water: "Medium",
    temperature: "20-35",
    time: 4,
    alternatives: ["Watermelon", "Cucumber"],
    companion: "Radish",
    nutrients: [30, 40, 30]
  },
  Coconut: {
    info: "Coconuts require high humidity, sandy soil, and coastal conditions.",
    next: "Legumes",
    yield: 100,
    soil: "Sandy Loam",
    water: "High",
    temperature: "25-35",
    time: 12,
    alternatives: ["Palm", "Banana"],
    companion: "Pineapple",
    nutrients: [50, 30, 20]
  },
  Cotton: {
    info: "Cotton grows well in black soil with adequate irrigation.",
    next: "Pulses",
    yield: 60,
    soil: "Black Soil",
    water: "Medium",
    temperature: "25-35",
    time: 6,
    alternatives: ["Jute", "Sunflower"],
    companion: "Peanut",
    nutrients: [20, 40, 40]
  },
  Jute: {
    info: "Jute thrives in warm, humid conditions and well-drained soil.",
    next: "Paddy",
    yield: 95,
    soil: "Alluvial",
    water: "High",
    temperature: "25-35",
    time: 5,
    alternatives: ["Cotton", "Flax"],
    companion: "Rice",
    nutrients: [30, 40, 30]
  }
};

export default function CropPlanner() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [cropInfo, setCropInfo] = useState(null);

  const handleSelect = (e) => {
    const crop = cropData[e.target.value];
    setSelectedCrop(e.target.value);
    setCropInfo(crop || null);
  };

  const barData = {
    labels: selectedCrop ? [selectedCrop] : [],
    datasets: [
      {
        label: "Yield (%)",
        data: cropInfo ? [cropInfo.yield] : [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Nitrogen", "Phosphorus", "Potassium"],
    datasets: [
      {
        data: cropInfo ? cropInfo.nutrients : [],
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
        borderWidth: 3,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          padding: 15,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          padding: 15,
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Crop Rotation Planner
          </h1>
          <p className="text-gray-600 text-lg">Plan your crops intelligently for optimal yield</p>
        </div>

        {/* Selection Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-green-100 hover:shadow-2xl transition-shadow duration-300">
          <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Select a Crop
          </label>
          <select
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white shadow-sm"
            value={selectedCrop}
            onChange={handleSelect}
          >
            <option value="">-- Choose Your Crop --</option>
            {Object.keys(cropData).map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* Crop Information */}
        {cropInfo && (
          <div className="animate-slide-up">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 mb-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{selectedCrop}</h2>
              <p className="text-green-50 text-lg leading-relaxed">{cropInfo.info}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Water Need</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{cropInfo.water}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-orange-100 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Temperature</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{cropInfo.temperature}°C</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-purple-100 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Duration</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{cropInfo.time} months</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-green-100 hover:scale-105 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Yield</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{cropInfo.yield}%</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-green-600" />
                  Growing Conditions
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Soil Type</span>
                    <span className="text-gray-800 font-semibold">{cropInfo.soil}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Companion Crop</span>
                    <span className="text-gray-800 font-semibold">{cropInfo.companion}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Rotation Planning
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Next Crop</span>
                    <span className="text-gray-800 font-semibold">{cropInfo.next}</span>
                  </div>
                  <div className="py-2">
                    <span className="text-gray-600 font-medium block mb-2">Alternatives</span>
                    <div className="flex flex-wrap gap-2">
                      {cropInfo.alternatives.map((alt, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Yield Analysis</h3>
                <div className="h-64">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Nutrient Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!cropInfo && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <Sprout className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Select a Crop to Begin</h3>
            <p className="text-gray-500">Choose a crop from the dropdown to view detailed information and analytics</p>
          </div>
        )}
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