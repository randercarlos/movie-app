import type { Movie, MovieDetails, MovieDetailsResponse, MovieGenresResponse, MovieResponse }
  from "@/typings/interfaces";

export const movieGenresResponseMock: MovieGenresResponse = {
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 11, name: "Drama" },
    { id: 3, name: "Cartoon" }
  ]
};

export const popularMoviesResponseMock: MovieResponse = {
  page: 1,
  results: [
    {
      "adult": false,
      "backdrop_path": "/xf1rEQRi9pZxoN8HfggVnhjOaBb.jpg",
      "genre_ids": [
        878,
        28,
        12
      ],
      "id": 823464,
      "original_language": "en",
      "original_title": "Godzilla x Kong: The New Empire",
      "overview": "Following their explosive showdown, Godzilla and Kong.",
      "popularity": 4500.758,
      "poster_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      "release_date": "2024-03-27",
      "title": "Godzilla x Kong: The New Empire",
      "video": false,
      "vote_average": 7.259,
      "vote_count": 2049
    },
    {
      "adult": false,
      "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      "genre_ids": [
        878,
        12,
        28
      ],
      "id": 653346,
      "original_language": "en",
      "original_title": "Kingdom of the Planet of the Apes",
      "overview": "Several generations in the future following Caesar's reign, apes are now.",
      "popularity": 1539.548,
      "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      "release_date": "2024-05-08",
      "title": "Kingdom of the Planet of the Apes",
      "video": false,
      "vote_average": 7.141,
      "vote_count": 538
    },
  ],
  total_pages: 1,
  total_results: 1
};

export const nowPlayingMoviesResponseMock: MovieResponse = {
  page: 1,
  results: [
    {
      "adult": false,
      "backdrop_path": "/xf1rEQRi9pZxoN8HfggVnhjOaBb.jpg",
      "genre_ids": [
        878,
        28,
        12
      ],
      "id": 823464,
      "original_language": "en",
      "original_title": "Godzilla x Kong: The New Empire",
      "overview": "Following their explosive showdown, Godzilla and Kong.",
      "popularity": 4500.758,
      "poster_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      "release_date": "2024-03-27",
      "title": "Godzilla x Kong: The New Empire",
      "video": false,
      "vote_average": 7.259,
      "vote_count": 2049
    },
    {
      "adult": false,
      "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      "genre_ids": [
        878,
        12,
        28
      ],
      "id": 653346,
      "original_language": "en",
      "original_title": "Kingdom of the Planet of the Apes",
      "overview": "Several generations in the future following Caesar's reign, apes are now.",
      "popularity": 1539.548,
      "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      "release_date": "2024-05-08",
      "title": "Kingdom of the Planet of the Apes",
      "video": false,
      "vote_average": 7.141,
      "vote_count": 538
    },
  ],
  total_pages: 1,
  total_results: 1
};

export const movieDetailsResponseMock: MovieDetailsResponse = {
  "adult": false,
  "backdrop_path": "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
  "belongs_to_collection": {
    "id": 1280074,
    "name": "Kong Collection",
    "poster_path": "/lhyEUeOihbKf7ll8RCIE5CHTie3.jpg",
    "backdrop_path": "/qHY4ZMIDSmElhiykjhh40Q5qMJl.jpg"
  },
  "budget": 150000000,
  "genres": [
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 28,
      "name": "Action"
    },
  ],
  "homepage": "https://www.godzillaxkongmovie.com",
  "id": 823464,
  "imdb_id": "tt14539740",
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Godzilla x Kong: The New Empire",
  "overview": "Following their explosive showdown, Godzilla and Kong must reunite against",
  "popularity": 4619.309,
  "poster_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
  "production_companies": [
    {
      "id": 923,
      "logo_path": "/8M99Dkt23MjQMTTWukq4m5XsEuo.png",
      "name": "Legendary Pictures",
      "origin_country": "US"
    }
  ],
  "production_countries": [],
  "release_date": "2024-03-27",
  "revenue": 558503759,
  "runtime": 115,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Rise together or fall alone.",
  "title": "Godzilla x Kong: The New Empire",
  "video": false,
  "vote_average": 7.283,
  "vote_count": 2148,
  "videos": {
    "results": [
      {
        "iso_639_1": "en",
        "iso_3166_1": "US",
        "name": "Title Reveal",
        "key": "1QLQCfw5lAM",
        "site": "YouTube",
        "size": 1080,
        "type": "Teaser",
        "official": true,
        "published_at": "2023-04-19T16:00:23.000Z",
        "id": "644020f6b0ba7e052713402d"
      }
    ]
  },
  "credits": {
    "cast": [
      {
        "adult": false,
        "gender": 1,
        "id": 15556,
        "known_for_department": "Acting",
        "name": "Rebecca Hall",
        "original_name": "Rebecca Hall",
        "popularity": 50.229,
        "profile_path": "/coC58ANiDbqRIyle5zEl9QDektf.jpg",
        "cast_id": 10,
        "character": "Dr. Ilene Andrews",
        "credit_id": "6307a3a8bb070d0095ae6147",
        "order": 0
      }
    ],
    "crew": [
      {
        "adult": false,
        "gender": 2,
        "id": 98631,
        "known_for_department": "Directing",
        "name": "Adam Wingard",
        "original_name": "Adam Wingard",
        "popularity": 9.661,
        "profile_path": "/gRnkcII3VzeHiU8j0OjFhuOsqlJ.jpg",
        "credit_id": "608879ed66e4690040e33c01",
        "department": "Directing",
        "job": "Director"
      },
    ]
  },
  "images": {
    "backdrops": [
      {
        "aspect_ratio": 1.778,
        "height": 2160,
        "iso_639_1": "en",
        "file_path": "/nDCN5WubZtnrUy5B1q67xde4wQI.jpg",
        "vote_average": 5.388,
        "vote_count": 4,
        "width": 3840
      },
    ],
    "logos": [
      {
        "aspect_ratio": 3.122,
        "height": 230,
        "iso_639_1": "zh",
        "file_path": "/3PM01kClBPevs96LQ8NmK03458H.png",
        "vote_average": 5.39,
        "vote_count": 6,
        "width": 718
      }
    ],
    "posters": [
      {
        "aspect_ratio": 0.667,
        "height": 3000,
        "iso_639_1": "en",
        "file_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        "vote_average": 4.968,
        "vote_count": 20,
        "width": 2000
      }
    ]
  }
};

export const moviesMock: Movie[] =[
  {
    genre_ids: [ 878, 28, 12 ],
    id: 823464,
    overview: "Following their explosive showdown, Godzilla and Kong.",
    poster_path: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    release_date: "Mar 27, 2024",
    title: "Godzilla x Kong: The New Empire",
    vote_average: "72.59%",
    genres: "Adventure, Action, "
  },
  {
    genre_ids: [ 878, 12, 28 ],
    id: 653346,
    overview: "Several generations in the future following Caesar's reign, apes are now.",
    poster_path: "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    release_date: "May 08, 2024",
    title: "Kingdom of the Planet of the Apes",
    vote_average: "71.41%",
    genres: "Adventure, Action, "
  }
];

export const movieDetailsMock: MovieDetails = {
  genres: "Science Fiction, Action",
  id: 823464,
  overview: "Following their explosive showdown, Godzilla and Kong must reunite against",
  poster_path: "https://image.tmdb.org/t/p/w500//z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
  release_date: "Mar 27, 2024",
  title: "Godzilla x Kong: The New Empire",
  vote_average: "72.83%",
  videos: {
    results: [
      {
        iso_639_1: "en",
        iso_3166_1: "US",
        name: "Title Reveal",
        key: "1QLQCfw5lAM",
        site: "YouTube",
        size: 1080,
        type: "Teaser",
        official: true,
        published_at: "2023-04-19T16:00:23.000Z",
        id: "644020f6b0ba7e052713402d"
      }
    ]
  },
  credits: {
    cast: [
      {
        adult: false,
        gender: 1,
        id: 15556,
        known_for_department: "Acting",
        name: "Rebecca Hall",
        original_name: "Rebecca Hall",
        popularity: 50.229,
        profile_path: "/coC58ANiDbqRIyle5zEl9QDektf.jpg",
        cast_id: 10,
        character: "Dr. Ilene Andrews",
        credit_id: "6307a3a8bb070d0095ae6147",
        order: 0
      }
    ],
    crew: [
      {
        adult: false,
        gender: 2,
        id: 98631,
        known_for_department: "Directing",
        name: "Adam Wingard",
        original_name: "Adam Wingard",
        popularity: 9.661,
        profile_path: "/gRnkcII3VzeHiU8j0OjFhuOsqlJ.jpg",
        credit_id: "608879ed66e4690040e33c01",
        department: "Directing",
        job: "Director"
      }
    ],
  },
  images: [
    {
      aspect_ratio: 1.778,
      height: 2160,
      iso_639_1: "en",
      file_path: "/nDCN5WubZtnrUy5B1q67xde4wQI.jpg",
      vote_average: 5.388,
      vote_count: 4,
      width: 3840
    }
  ],
  crew: [
    {
      adult: false,
      gender: 2,
      id: 98631,
      known_for_department: "Directing",
      name: "Adam Wingard",
      original_name: "Adam Wingard",
      popularity: 9.661,
      profile_path: "/gRnkcII3VzeHiU8j0OjFhuOsqlJ.jpg",
      credit_id: "608879ed66e4690040e33c01",
      department: "Directing",
      job: "Director"
    }
  ],
  cast: [
    {
      adult: false,
      gender: 1,
      id: 15556,
      known_for_department: "Acting",
      name: "Rebecca Hall",
      original_name: "Rebecca Hall",
      popularity: 50.229,
      profile_path: "https://image.tmdb.org/t/p/w300/coC58ANiDbqRIyle5zEl9QDektf.jpg",
      cast_id: 10,
      character: "Dr. Ilene Andrews",
      credit_id: "6307a3a8bb070d0095ae6147",
      order: 0
    }
  ]
};
