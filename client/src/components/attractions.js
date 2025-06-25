// Hier is die liste die von Attractions je nach Stadt die spater in Attractionskarte geloaded wird.
//Jeder Attraction hat seiner id, Cityid (die Stadt name wo es sich befindet,Name(der Name der Attractin)
// Description(Paar ERläuterung über die Attraction), Image und Rating))
export const attractions = [
    // Paris
    {
        id: 'eiffel-tower',
        cityId: 'paris',
        name: 'Eiffel Tower',
        description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
        image: '/images/eiffeltower.jpg',
        rating: 4.7
    },
    {
        id: 'louvre-museum',
        cityId: 'paris',
        name: 'Louvre Museum',
        description: 'The world\'s largest art museum and a historic monument housing priceless works including the Mona Lisa.',
        image: '/images/louvre.jpg',
        rating: 3.5
    },
    {
        id: 'notre-dame',
        cityId: 'paris',
        name: 'Notre-Dame Cathedral',
        description: 'Medieval Catholic cathedral on the Île de la Cité, known for its French Gothic architecture.',
        image: '/images/notredame.jpg',
        rating: 4.5
    },
    {
        id: 'sacre-coeur',
        cityId: 'paris',
        name: 'Sacré-Cœur',
        description: 'Basilica of the Sacred Heart of Paris, located at the summit of the Montmartre hill.',
        image: '/images/sacrecoeur.jpg',
        rating: 4.3
    },
    {
        id: 'champs-elysees',
        cityId: 'paris',
        name: 'Champs-Élysées',
        description: 'Famous avenue in Paris known for theatres, cafés, and luxury shops.',
        image: '/images/champselysees.jpg',
        rating: 4.1
    },

    // Tokyo
    {
        id: 'tokyo-skytree',
        cityId: 'tokyo',
        name: 'Tokyo Skytree',
        description: 'A broadcasting and observation tower, and the tallest structure in Japan.',
        image: '/images/tokyoskytree.jpg',
        rating: 3.2
    },
    {
        id: 'senso-ji',
        cityId: 'tokyo',
        name: 'Sensō-ji',
        description: 'Ancient Buddhist temple located in Asakusa, Tokyo\'s oldest temple.',
        image: '/images/sensoji.jpg',
        rating: 4.6
    },
    {
        id: 'meiji-shrine',
        cityId: 'tokyo',
        name: 'Meiji Shrine',
        description: 'Shinto shrine dedicated to Emperor Meiji and Empress Shōken.',
        image: '/images/meijishrine.jpg',
        rating: 5
    },
    {
        id: 'shibuya-crossing',
        cityId: 'tokyo',
        name: 'Shibuya Crossing',
        description: 'World-famous intersection known for its massive pedestrian crosswalks.',
        image: '/images/shibuyacrossing.jpg',
        rating: 4.4
    },
    {
        id: 'teamlab-borderless',
        cityId: 'tokyo',
        name: 'teamLab Borderless',
        description: 'Interactive digital art museum offering immersive experiences.',
        image: '/images/teamlab.jpg',
        rating: 4.9
    },

    // New York
    {
        id: 'statue-of-liberty',
        cityId: 'newyork',
        name: 'Statue of Liberty',
        description: 'Colossal neoclassical sculpture on Liberty Island, a symbol of freedom and the United States.',
        image: '/images/statueofliberty.jpg',
        rating: 4.2
    },
    {
        id: 'times-square',
        cityId: 'newyork',
        name: 'Times Square',
        description: 'Major commercial intersection, tourist destination, and entertainment center.',
        image: '/images/timessquare.jpg',
        rating: 4.9
    },
    {
        id: 'central-park',
        cityId: 'newyork',
        name: 'Central Park',
        description: 'Urban park in Manhattan, the most visited urban park in the United States.',
        image: '/images/centralpark.jpg',
        rating: 3.2
    },
    {
        id: 'empire-state-building',
        cityId: 'newyork',
        name: 'Empire State Building',
        description: '102-story Art Deco skyscraper in Midtown Manhattan.',
        image: '/images/empirestate.jpg',
        rating: 4.6
    },
    {
        id: 'brooklyn-bridge',
        cityId: 'newyork',
        name: 'Brooklyn Bridge',
        description: 'Hybrid cable-stayed/suspension bridge connecting Manhattan and Brooklyn.',
        image: '/images/brooklynbridge.jpg',
        rating: 4.3
    },

    // Rome
    {
        id: 'colosseum',
        cityId: 'rome',
        name: 'Colosseum',
        description: 'Ancient Roman amphitheater built of travertine limestone, tuff, and brick-faced concrete.',
        image: '/images/colosseum.jpg',
        rating: 4.8
    },
    {
        id: 'vatican-city',
        cityId: 'rome',
        name: 'Vatican City',
        description: 'Independent city-state enclaved within Rome, home to St. Peter\'s Basilica and the Vatican Museums.',
        image: '/images/vaticancity.jpg',
        rating: 3.2
    },
    {
        id: 'pantheon',
        cityId: 'rome',
        name: 'Pantheon',
        description: 'Former Roman temple, now a church, known for its large dome.',
        image: '/images/pantheon.jpg',
        rating: 4.7
    },
    {
        id: 'trevi-fountain',
        cityId: 'rome',
        name: 'Trevi Fountain',
        description: 'Famous Baroque fountain where visitors toss coins to ensure a return to Rome.',
        image: '/images/trevifountain.jpg',
        rating: 4.6
    },
    {
        id: 'roman-forum',
        cityId: 'rome',
        name: 'Roman Forum',
        description: 'Rectangular forum surrounded by ruins of ancient government buildings.',
        image: '/images/romanforum.jpg',
        rating: 4.4
    },

    // Sydney
    {
        id: 'sydney-opera-house',
        cityId: 'sydney',
        name: 'Sydney Opera House',
        description: 'Multi-venue performing arts center and one of the 20th century\'s most distinctive buildings.',
        image: '/images/operahouse.jpg',
        rating: 4.8
    },
    {
        id: 'bondi-beach',
        cityId: 'sydney',
        name: 'Bondi Beach',
        description: 'Popular beach and the name of the surrounding suburb in Sydney.',
        image: '/images/bondibeach.jpg',
        rating: 3.6
    },
    {
        id: 'sydney-harbour-bridge',
        cityId: 'sydney',
        name: 'Sydney Harbour Bridge',
        description: 'Steel through arch bridge across Sydney Harbour that carries rail, vehicular, bicycle, and pedestrian traffic.',
        image: '/images/harbourbridge.jpg',
        rating: 4.5
    },
    {
        id: 'taronga-zoo',
        cityId: 'sydney',
        name: 'Taronga Zoo',
        description: 'Large zoo located in Sydney with views of the city and a wide variety of animals.',
        image: '/images/tarongazoo.jpg',
        rating: 4.2
    },
    {
        id: 'darling-harbour',
        cityId: 'sydney',
        name: 'Darling Harbour',
        description: 'Harbourside area featuring shops, restaurants, museums, and entertainment venues.',
        image: '/images/darlingharbour.jpg',
        rating: 4.1
    },

    // Istanbul
    {
        id: 'blue-mosque',
        cityId: 'istanbul',
        name: 'Blue Mosque',
        description: 'Historic mosque known for its hand-painted blue tiles and six minarets.',
        image: '/images/bluemosque.jpg',
        rating: 4.7
    },
    {
        id: 'hagia-sophia',
        cityId: 'istanbul',
        name: 'Hagia Sophia',
        description: 'Famous museum and mosque, formerly a cathedral, with stunning architecture.',
        image: '/images/hagiasophia.jpg',
        rating: 4.8
    },
    {
        id: 'topkapi-palace',
        cityId: 'istanbul',
        name: 'Topkapi Palace',
        description: 'Large museum in Istanbul that served as the main residence of the Ottoman sultans.',
        image: '/images/topkapi.jpg',
        rating: 4.6
    },
    {
        id: 'grand-bazaar',
        cityId: 'istanbul',
        name: 'Grand Bazaar',
        description: 'One of the largest and oldest covered markets in the world.',
        image: '/images/grandbazaar.jpg',
        rating: 4.3
    },
    {
        id: 'galata-tower',
        cityId: 'istanbul',
        name: 'Galata Tower',
        description: 'Medieval stone tower in the Galata/Karaköy quarter with panoramic views of the city.',
        image: '/images/galatatower.jpg',
        rating: 4.4
    },

    // Barcelona
    {
        id: 'sagrada-familia',
        cityId: 'barcelona',
        name: 'Sagrada Familia',
        description: 'Large unfinished Roman Catholic church designed by architect Antoni Gaudí.',
        image: '/images/sagradafamilia.jpg',
        rating: 4.9
    },
    {
        id: 'park-guell',
        cityId: 'barcelona',
        name: 'Park Güell',
        description: 'Public park system composed of gardens and architectural elements designed by Gaudí.',
        image: '/images/parkguell.jpg',
        rating: 4.6
    },
    {
        id: 'casa-batllo',
        cityId: 'barcelona',
        name: 'Casa Batlló',
        description: 'Renowned building designed by Antoni Gaudí, known for its unique architecture.',
        image: '/images/casabatllo.jpg',
        rating: 4.5
    },
    {
        id: 'la-rambla',
        cityId: 'barcelona',
        name: 'La Rambla',
        description: 'Popular street in central Barcelona known for shops, cafes, and street performances.',
        image: '/images/larambla.jpg',
        rating: 4.2
    },
    {
        id: 'picasso-museum',
        cityId: 'barcelona',
        name: 'Picasso Museum',
        description: 'Museum housing one of the most extensive collections of artworks by the 20th-century Spanish artist Pablo Picasso.',
        image: '/images/picassomuseum.jpg',
        rating: 4.3
    },

    // Dubai
    {
        id: 'burj-khalifa',
        cityId: 'dubai',
        name: 'Burj Khalifa',
        description: 'The world\'s tallest building, standing at 829.8 meters.',
        image: '/images/burjkhalifa.jpg',
        rating: 4.8
    },
    {
        id: 'dubai-mall',
        cityId: 'dubai',
        name: 'Dubai Mall',
        description: 'The largest mall in the world by total area, featuring shops, attractions, and an aquarium.',
        image: '/images/dubaimall.jpg',
        rating: 4.5
    },
    {
        id: 'palm-jumeirah',
        cityId: 'dubai',
        name: 'Palm Jumeirah',
        description: 'Artificial archipelago resembling a palm tree, known for luxury hotels and beaches.',
        image: '/images/palmjumeirah.jpg',
        rating: 4.4
    },
    {
        id: 'dubai-fountain',
        cityId: 'dubai',
        name: 'Dubai Fountain',
        description: 'Choreographed fountain system set on the Burj Khalifa Lake.',
        image: '/images/dubaifountain.jpg',
        rating: 4.6
    },
    {
        id: 'burj-al-arab',
        cityId: 'dubai',
        name: 'Burj Al Arab',
        description: 'Luxury hotel often described as the world\'s only "seven-star" hotel.',
        image: '/images/burjalarab.jpg',
        rating: 4.7
    },
    // Bali
    {
        id: 'tanah-lot-temple',
        cityId: 'bali',
        name: 'Tanah Lot Temple',
        description: 'Iconic sea temple perched on a rock formation, famous for sunset views.',
        image: '/images/tanahlot.jpg',
        rating: 4.7
    },
    {
        id: 'ubud-monkey-forest',
        cityId: 'bali',
        name: 'Ubud Monkey Forest',
        description: 'Sacred forest sanctuary home to hundreds of long-tailed macaques.',
        image: '/images/monkeyforest.jpg',
        rating: 4.5
    },
    {
        id: 'tegalalang-rice-terrace',
        cityId: 'bali',
        name: 'Tegalalang Rice Terrace',
        description: 'Famous for stunning terraced landscapes and traditional Balinese irrigation.',
        image: '/images/tegalalang.jpg',
        rating: 4.6
    },
    {
        id: 'uluwatu-temple',
        cityId: 'bali',
        name: 'Uluwatu Temple',
        description: 'Clifftop Hindu temple offering ocean views and traditional Kecak dance performances.',
        image: '/images/uluwatu.jpg',
        rating: 4.7
    },
    {
        id: 'nusa-penida',
        cityId: 'bali',
        name: 'Nusa Penida',
        description: 'Island paradise with dramatic coastal cliffs, beaches, and dive sites.',
        image: '/images/nusapenida.jpg',
        rating: 4.8
    },

    // Singapore
    {
        id: 'gardens-by-the-bay',
        cityId: 'singapore',
        name: 'Gardens by the Bay',
        description: 'Nature park spanning 101 hectares of reclaimed land in central Singapore.',
        image: '/images/gardensbythebay.jpg',
        rating: 4.7
    },
    {
        id: 'marina-bay-sands',
        cityId: 'singapore',
        name: 'Marina Bay Sands',
        description: 'Luxury resort with a rooftop infinity pool and panoramic views.',
        image: '/images/marinabaysands.jpg',
        rating: 4.8
    },
    {
        id: 'sentosa-island',
        cityId: 'singapore',
        name: 'Sentosa Island',
        description: 'Popular island resort known for beaches, resorts, and attractions.',
        image: '/images/sentosa.jpg',
        rating: 4.5
    },
    {
        id: 'merlion-park',
        cityId: 'singapore',
        name: 'Merlion Park',
        description: 'Park with a famous statue combining a lion\'s head and a fish\'s body.',
        image: '/images/merlion.jpg',
        rating: 4.2
    },
    {
        id: 'singapore-zoo',
        cityId: 'singapore',
        name: 'Singapore Zoo',
        description: 'Award-winning zoo known for its "open concept" and conservation efforts.',
        image: '/images/singaporezoo.jpg',
        rating: 4.6
    },
    // Santorini
    {
        id: 'oia-village',
        cityId: 'santorini',
        name: 'Oia Village',
        description: 'Charming village known for its whitewashed houses, blue-domed churches, and stunning sunset views.',
        image: '/images/oia.jpg',
        rating: 4.8
    },
    {
        id: 'fira-town',
        cityId: 'santorini',
        name: 'Fira Town',
        description: 'Santorini’s capital, offering shops, restaurants, and cliffside views of the caldera.',
        image: '/images/fira.jpg',
        rating: 4.4
    },
    {
        id: 'red-beach',
        cityId: 'santorini',
        name: 'Red Beach',
        description: 'Famous for its red volcanic sand and dramatic landscape near Akrotiri.',
        image: '/images/redbeach.jpg',
        rating: 4.2
    },
    {
        id: 'akrotiri-ruins',
        cityId: 'santorini',
        name: 'Akrotiri Ruins',
        description: 'Ancient Minoan Bronze Age settlement preserved in volcanic ash, often called the “Pompeii of the Aegean.”',
        image: '/images/akrotiri.jpg',
        rating: 4.3
    },
    {
        id: 'santo-winery',
        cityId: 'santorini',
        name: 'Santo Winery',
        description: 'Popular winery offering tastings and panoramic views of the caldera.',
        image: '/images/santowinery.jpg',
        rating: 4.6
    },
    // London
    {
        id: 'big-ben',
        cityId: 'london',
        name: 'Big Ben',
        description: 'The nickname for the Great Bell of the clock at the north end of the Palace of Westminster.',
        image: '/images/bigben.jpg',
        rating: 4.6
    },
    {
        id: 'tower-bridge',
        cityId: 'london',
        name: 'Tower Bridge',
        description: 'Iconic Victorian bridge and symbol of London.',
        image: '/images/towerbridge.jpg',
        rating: 4.5
    },
    {
        id: 'london-eye',
        cityId: 'london',
        name: 'London Eye',
        description: 'Giant Ferris wheel on the South Bank of the River Thames.',
        image: '/images/londoneye.jpg',
        rating: 4.4
    },
    {
        id: 'british-museum',
        cityId: 'london',
        name: 'British Museum',
        description: 'Museum dedicated to human history, art, and culture with over 8 million works.',
        image: '/images/britishmuseum.jpg',
        rating: 4.7
    },
    {
        id: 'buckingham-palace',
        cityId: 'london',
        name: 'Buckingham Palace',
        description: 'London residence and administrative headquarters of the monarch of the United Kingdom.',
        image: '/images/buckinghampalace.jpg',
        rating: 4.3
    }
];
