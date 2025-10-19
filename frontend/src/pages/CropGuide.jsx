import { useState } from "react";
import { Sprout, Droplets, Leaf, TrendingUp, X, Play } from "lucide-react";

const crops = [
  { 
    name: "Wheat", 
    steps: ["Sow seeds in November", "Water every 7-10 days", "Fertilize after 3 weeks", "Harvest in April"], 
    watering: ["Once a week", "Increase in dry weather"], 
    fertilizer: ["Urea after 3 weeks", "DAP before flowering"], 
    yield: "30-40 quintals per acre", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXUA7lHq-tPoSNEXoich81bd0TkAbUrAxxw&s",
    video: "https://www.youtube.com/embed/JN0ICendQns" 
  },
  { 
    name: "Rice", 
    steps: ["Sow seeds in June", "Maintain flooded field", "Apply fertilizers in stages", "Harvest in October"], 
    watering: ["Keep field submerged"], 
    fertilizer: ["Nitrogen-rich fertilizers", "Potash for grain development"], 
    yield: "40-60 quintals per acre", 
    image: "https://t3.ftcdn.net/jpg/02/71/72/42/360_F_271724295_5mOXgLdBpOIk7jspFGSdkY1ShVqBjCie.jpg",
    video: "https://www.youtube.com/embed/kT1R7Hkps5M"
  },
  { 
    name: "Maize", 
    steps: ["Plant in early spring", "Thin plants after germination", "Apply fertilizers in stages", "Harvest in summer"], 
    watering: ["Every 5-7 days"], 
    fertilizer: ["Nitrogen at early stage", "Phosphorus before tasseling"], 
    yield: "50-80 quintals per acre", 
    image: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.jpg?s=612x612&w=0&k=20&c=NEEzE5il-up8g7NZj_7HJUpyVep18zBRfhnMZ5laLiQ=",
    video: "https://www.youtube.com/embed/nfMLKP1nXK0"
  },
  { 
    name: "Barley", 
    steps: ["Sow seeds in November", "Apply fertilizer before tillering", "Water moderately", "Harvest in April"], 
    watering: ["Once every 10 days"], 
    fertilizer: ["Urea before tillering", "Super phosphate before flowering"], 
    yield: "25-35 quintals per acre", 
    image: "https://www.gardenindelight.com/wp-content/uploads/2021/04/barley-Hordeum-vulgare-CP2.jpg",
    video: "https://www.youtube.com/embed/JN0ICendQns"
  },
  { 
    name: "Soybean", 
    steps: ["Sow seeds in June", "Water during flowering", "Fertilize in early growth", "Harvest in September"], 
    watering: ["Every 5-7 days"], 
    fertilizer: ["DAP at planting", "Potash during pod formation"], 
    yield: "15-25 quintals per acre", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDgAMyticfJVw9vVVa_pkV5ujCpHtKLWAIQ&s",
    video: "https://www.youtube.com/embed/BgWUKm27w_8"
  }
  ,
    { 
        name: "Groundnut", 
        steps: ["Plant in June", "Weed regularly", "Water during flowering", "Harvest in September"], 
        watering: ["Every 7-10 days"], 
        fertilizer: ["Gypsum for better pods", "Potash at mid-stage"], 
        yield: "10-20 quintals per acre", 
        image: "https://media.istockphoto.com/id/629587334/photo/holding-peanut-stem-in-the-farmland.jpg?s=612x612&w=0&k=20&c=RpKA09-_XhzdE4nSUUbifMUKOD_3jQg9FW8l3j6BhIU=",
        video: "https://www.youtube.com/embed/i6SxMFDf4rQ"
    },
    { 
        name: "Sugarcane", 
        steps: ["Plant in spring", "Irrigate regularly", "Apply fertilizers at multiple stages", "Harvest after 12 months"], 
        watering: ["Every 7-10 days"], 
        fertilizer: ["Nitrogen, Phosphorus, Potash mix"], 
        yield: "60-100 tons per acre", 
        image: "https://m.media-amazon.com/images/I/81cL7FcogWL.jpg",
        video: "https://www.youtube.com/embed/wdvrzWtkHfA"
    },
    { 
        name: "Tomato", 
        steps: ["Sow seeds in nursery", "Transplant after 4 weeks", "Water and fertilize regularly", "Harvest in 3 months"], 
        watering: ["Every 3-4 days"], 
        fertilizer: ["NPK 19:19:19", "Calcium nitrate during fruiting"], 
        yield: "10-30 tons per acre", 
        image: "https://media.istockphoto.com/id/450481469/photo/natural-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=zeftcGALF-HmVwF7N2nfRlHfIz12wKi5UHkbVX3t_W8=",
        video: "https://www.youtube.com/embed/FSFBPtRO4HU"
    },
    { 
        name: "Potato", 
        steps: ["Plant in January", "Hill soil around stems", "Water regularly", "Harvest in May"], 
        watering: ["Every 7 days"], 
        fertilizer: ["Potassium before planting", "Urea at vegetative stage"], 
        yield: "80-100 quintals per acre", 
        image: "https://t3.ftcdn.net/jpg/03/57/43/10/360_F_357431058_0TdRY2J5h7FKn2uwwzGb4IRCvNxFNoSE.jpg",
        video: "https://www.youtube.com/embed/CEEiP-DfOfY"
    },
    { 
        name: "Onion", 
        steps: ["Plant in September", "Thin plants after germination", "Water regularly", "Harvest in March"], 
        watering: ["Every 5-7 days"], 
        fertilizer: ["Phosphorus at planting", "Potash before bulbing"], 
        yield: "10-25 tons per acre", 
        image: "https://cdn.shopify.com/s/files/1/0579/7924/0580/files/76326b1997_480x480.jpg?v=1719218667",
        video: "https://www.youtube.com/embed/5AzTxLDL-hk"
    },
    { 
        name: "Carrot", 
        steps: ["Sow seeds in cool climate", "Thin plants after germination", "Water regularly", "Harvest in 3 months"], 
        watering: ["Every 5-7 days"], 
        fertilizer: ["Organic compost", "Potash before bulbing"], 
        yield: "8-15 tons per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAVkUQPxxstwdaiVfMum_geuCWnNstmKN5w&s",
        video: "https://www.youtube.com/embed/mcW9bQd8YuY"
    },
    { 
        name: "Green Chili", 
        steps: ["Plant in warm season", "Apply fertilizers regularly", "Water moderately", "Harvest after 4 months"], 
        watering: ["Every 4-5 days"], 
        fertilizer: ["NPK at early stage", "Micronutrients for fruiting"], 
        yield: "5-15 quintals per acre", 
        image: "https://m.media-amazon.com/images/I/61SOsUxkcnL.jpg",
        video: "https://www.youtube.com/embed/pf07w8CNRJU"
    },
    { 
        name: "Cabbage", 
        steps: ["Plant in winter", "Water regularly", "Apply fertilizers during growth", "Harvest in 3 months"], 
        watering: ["Every 5 days"], 
        fertilizer: ["Organic compost", "NPK 12:32:16"], 
        yield: "10-20 tons per acre", 
        image: "https://bonnieplants.com/cdn/shop/articles/BONNIE_cabbage_iStock-503870662-1800px_31bfd05a-f56d-40ce-8dab-adac49ea5d80.jpg?v=1642541962",
        video: "https://www.youtube.com/embed/NmLmksQfhZ4"
    },
    { 
        name: "Cauliflower", 
        steps: ["Plant in cool climate", "Water regularly", "Apply fertilizers at different stages", "Harvest in 3 months"], 
        watering: ["Every 5-6 days"], 
        fertilizer: ["Phosphorus at planting", "Micronutrients for better heads"], 
        yield: "8-15 tons per acre", 
        image: "https://www.thespruce.com/thmb/3xv-bplva31jK5D9fYL0_5c9UB0=/4696x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grow-cauliflower-1403494-hero-76cf5f524a564adabb1ac6adfa311482.jpg",
        video: "https://www.youtube.com/embed/IhWReZ1FfAQ"
    },
   
    { 
        name: "Beetroot", 
        steps: ["Sow seeds in cool weather", "Thin seedlings after 2 weeks", "Water regularly", "Harvest in 2-3 months"], 
        watering: ["Every 5-7 days"], 
        fertilizer: ["Organic compost", "Potash for root growth"], 
        yield: "10-15 tons per acre", 
        image: "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/8571d195-a40a-4e8c-839c-724ca27ea057-9020251.jpg",
        video: "https://www.youtube.com/embed/d5o8L3Ohm5s"
    },
    { 
        name: "Radish", 
        steps: ["Sow seeds in rows", "Water consistently", "Thin plants after germination", "Harvest in 40-50 days"], 
        watering: ["Every 3-4 days"], 
        fertilizer: ["Organic compost", "Low nitrogen fertilizer"], 
        yield: "8-12 tons per acre", 
        image: "https://gardenerspath.com/wp-content/uploads/2023/05/How-to-Grow-Radishes-Feature.jpg",
        video: "https://www.youtube.com/embed/WdrhssEoR6g"
    },
    { 
        name: "Cucumber", 
        steps: ["Plant in warm weather", "Support vines with trellis", "Water frequently", "Harvest after 50-60 days"], 
        watering: ["Every 3-5 days"], 
        fertilizer: ["NPK 20:20:20", "Calcium nitrate during fruiting"], 
        yield: "10-20 tons per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDfe951a6bWWfu5MDXd2z_IxMGs0Q_Xl6gQ&s",
        video: "https://www.youtube.com/embed/Xwrv2H0R09A"
    },
    { 
        name: "Pumpkin", 
        steps: ["Plant in spring", "Water deeply", "Use organic mulch", "Harvest after 3-4 months"], 
        watering: ["Every 5-7 days"], 
        fertilizer: ["Compost before planting", "Phosphorus for better fruiting"], 
        yield: "10-15 tons per acre", 
        image: "https://plantsinformation.com/wp-content/uploads/pumpkin-plants.jpg",
        video: "https://www.youtube.com/embed/dDF8a4yHfA8"
    },
    { 
        name: "Brinjal (Eggplant)", 
        steps: ["Sow seeds in nursery", "Transplant after 5-6 weeks", "Water regularly", "Harvest after 90-100 days"], 
        watering: ["Every 4-5 days"], 
        fertilizer: ["NPK 12:32:16", "Micronutrients for flowering"], 
        yield: "20-30 quintals per acre", 
        image: "https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg",
        video: "https://www.youtube.com/embed/Xrl6ttPaZbY"
    },
    { 
        name: "Lady's Finger (Okra)", 
        steps: ["Sow seeds directly", "Thin plants after germination", "Water regularly", "Harvest in 50-60 days"], 
        watering: ["Every 3-5 days"], 
        fertilizer: ["Phosphorus at planting", "Potash for fruiting"], 
        yield: "10-15 quintals per acre", 
        image: "https://m.media-amazon.com/images/I/51gKrDtwE6L.jpg",
        video: "https://www.youtube.com/embed/l8MM37j-VX0"
    },
    { 
        name: "Bitter Gourd", 
        steps: ["Sow seeds in warm season", "Support vines with trellis", "Water frequently", "Harvest in 60-70 days"], 
        watering: ["Every 3-4 days"], 
        fertilizer: ["Organic compost", "Phosphorus before flowering"], 
        yield: "8-12 tons per acre", 
        image: "https://gardeningsg.nparks.gov.sg/images/Plants/Bittergourd%20(1).jpg",
        video: "https://www.youtube.com/embed/EpTmFfPlM6Y"
    },
    { 
        name: "Bottle Gourd", 
        steps: ["Sow seeds in well-drained soil", "Use trellis for better growth", "Water consistently", "Harvest in 90-100 days"], 
        watering: ["Every 3-5 days"], 
        fertilizer: ["NPK 19:19:19", "Calcium nitrate during fruiting"], 
        yield: "15-20 tons per acre", 
        image: "data:image/jpeg;base64,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",
        video: "https://www.youtube.com/embed/bVwR3EpQXrM"
    },
    { 
        name: "Ragi (Finger Millet)", 
        steps: ["Sow seeds in June-July", "Thin seedlings after germination", "Water regularly", "Harvest in 3-4 months"], 
        watering: ["Every 7-10 days"], 
        fertilizer: ["Organic manure before planting", "Urea during tillering stage"], 
        yield: "15-20 quintals per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_NNIdVD6HPg_d0kzrSs_OfUpsQOOB_0yqOQ&s",
        video: "https://www.youtube.com/embed/yIexyRzxxQc"
    },
    { 
        name: "Peas", 
        steps: ["Sow seeds in cool weather", "Provide trellis support for climbing", "Water regularly", "Harvest in 60-70 days"], 
        watering: ["Every 4-5 days"], 
        fertilizer: ["Organic compost", "Phosphorus for root development"], 
        yield: "8-12 quintals per acre", 
        image: "data:image/jpeg;base64,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",
        video: "https://www.youtube.com/embed/sdfH9gHupKM"
    },
    { 
        name: "Ginger", 
        steps: ["Plant rhizomes in raised beds", "Mulch to retain moisture", "Water consistently", "Harvest in 8-10 months"], 
        watering: ["Every 3-5 days"], 
        fertilizer: ["Compost-rich soil", "Potash for better yield"], 
        yield: "15-25 tons per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMslrl-D-wHIntcZuklEYLh3TP_CDdFqEaDw&s",
        video: "https://www.youtube.com/embed/MHGcswddYYA"
    },
    { 
        name: "Garlic", 
        steps: ["Plant cloves in well-drained soil", "Water moderately", "Remove weeds regularly", "Harvest after 6-7 months"], 
        watering: ["Every 7-10 days"], 
        fertilizer: ["Organic manure", "Potassium nitrate during bulb formation"], 
        yield: "3-6 tons per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlONAiI5FIoOzG5o5DiTCiIFJpSBYZj1VhAA&s",
        video: "https://www.youtube.com/embed/nTHxz8tAVAs"
    },
    { 
        name: "Sweet Corn", 
        steps: ["Sow seeds in warm soil", "Thin plants after germination", "Water deeply", "Harvest after 90-100 days"], 
        watering: ["Every 5-7 days"], 
        fertilizer: ["Nitrogen-rich fertilizer at knee-high stage", "Phosphorus for root growth"], 
        yield: "50-80 quintals per acre", 
        image: "data:image/jpeg;base64,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",
        video: "https://www.youtube.com/embed/tp_e1nVxWjY"
    },
    { 
        name: "Broccoli", 
        steps: ["Sow seeds in cool weather", "Transplant after 4-5 weeks", "Water regularly", "Harvest after 70-90 days"], 
        watering: ["Every 3-5 days"], 
        fertilizer: ["Nitrogen at early stage", "Calcium for head formation"], 
        yield: "5-10 tons per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQ7KLSSY7Y375ubwc7sy8bzswP8wPqrr3lQ&s",
        video: "https://www.youtube.com/embed/HX2Y7iVkUFo"
    },
    { 
        name: "Capsicum (Bell Pepper)", 
        steps: ["Sow seeds in nursery", "Transplant after 30-40 days", "Provide staking support", "Harvest in 60-80 days"], 
        watering: ["Every 3-4 days", "More in dry weather"], 
        fertilizer: ["Nitrogen at early stage", "Phosphorus for root development"], 
        yield: "80-100 quintals per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnJ7osDAvQpx7gp-OxpKwglKuRcgn65tSdJQ&s",
        video: "https://www.youtube.com/embed/O6BY6jWbBlg"
    },
    { 
        name: "Banana", 
        steps: ["Plant suckers in well-drained soil", "Provide drip irrigation", "Add mulch for moisture retention", "Harvest after 10-12 months"], 
        watering: ["Regular watering", "Drip irrigation recommended"], 
        fertilizer: ["Organic manure at planting", "Potassium for fruit development"], 
        yield: "30-50 tons per acre", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHcPHmTNnJ0CWTygO4zebI5a1yimgPFQeezA&s",
        video: "https://www.youtube.com/embed/KpYVJ7B5wsE"
    }
];

export default function CropGuide() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Modern Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Crop Growth Guide
          </h1>
        </div>
      </header>

      <main className="pt-24 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Learn How to Grow Your Crops
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive guides with step-by-step instructions and video tutorials
            </p>
          </div>

          {/* Crops Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map((crop, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
                onClick={() => setSelectedCrop(crop)}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${crop.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{crop.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Yield: {crop.yield}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-up">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedCrop.color} p-6 relative`}>
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
                onClick={() => setSelectedCrop(null)}
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">{selectedCrop.name}</h2>
              <p className="text-white/90 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Expected Yield: {selectedCrop.yield}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Growing Steps */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Growing Steps</h3>
                  </div>
                  <ol className="space-y-3">
                    {selectedCrop.steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Watering Schedule */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Watering Schedule</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedCrop.watering.map((water, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{water}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fertilizer */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Fertilizer Requirements</h3>
                </div>
                <ul className="space-y-2">
                  {selectedCrop.fertilizer.map((fert, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{fert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Tutorial */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-600" />
                  Video Tutorial
                </h3>
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={selectedCrop.video}
                    title={`${selectedCrop.name} Growing Guide`}
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}