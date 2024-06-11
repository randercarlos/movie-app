import type { Movie, MovieDetails,
  MovieDetailsResponse,
  MovieGenresResponse,
  MovieResponse, TvShow, TvShowDetails, TvShowDetailsResponse, TvShowGenresResponse, TvShowResponse
} from "@/typings/interfaces";

// ===============================================================================================
// MOVIES
// ===============================================================================================

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
  poster_path: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
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

// ===============================================================================================
// TV SHOWS
// ===============================================================================================

export const tvShowGenresResponseMock: TvShowGenresResponse = {
  "genres": [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
};

export const popularTvShowsResponseMock: TvShowResponse = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/hib8MpBPU7GdluS38htXCF4uw0c.jpg",
      "first_air_date": "1999-09-20",
      "genre_ids": [80, 18, 9648],
      "id": 2734,
      "name": "Law & Order: Special Victims Unit",
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Law & Order: Special Victims Unit",
      "overview": "In the criminal justice system, sexually-based offenses are considered",
      "popularity": 4519.753,
      "poster_path": "/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
      "vote_average": 7.918,
      "vote_count": 3694
    },
    {
      "adult": false,
      "backdrop_path": "/nmg2lY4QuyXQrAnrC2lRblK5rT6.jpg",
      "first_air_date": "2005-03-27",
      "genre_ids": [18],
      "id": 1416,
      "name": "Grey's Anatomy",
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Grey's Anatomy",
      "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s ",
      "popularity": 3263.563,
      "poster_path": "/jcEl8SISNfGdlQFwLzeEtsjDvpw.jpg",
      "vote_average": 8.234,
      "vote_count": 10001
    }
  ],
  "total_pages": 8687,
  "total_results": 173735
};

export const topRatedTvShowsResponseMock: TvShowResponse = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/hib8MpBPU7GdluS38htXCF4uw0c.jpg",
      "first_air_date": "1999-09-20",
      "genre_ids": [80, 18, 9648],
      "id": 2734,
      "name": "Law & Order: Special Victims Unit",
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Law & Order: Special Victims Unit",
      "overview": "In the criminal justice system, sexually-based offenses are considered ",
      "popularity": 4519.753,
      "poster_path": "/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
      "vote_average": 7.918,
      "vote_count": 3694
    },
    {
      "adult": false,
      "backdrop_path": "/nmg2lY4QuyXQrAnrC2lRblK5rT6.jpg",
      "first_air_date": "2005-03-27",
      "genre_ids": [18],
      "id": 1416,
      "name": "Grey's Anatomy",
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Grey's Anatomy",
      "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s ",
      "popularity": 3263.563,
      "poster_path": "/jcEl8SISNfGdlQFwLzeEtsjDvpw.jpg",
      "vote_average": 8.234,
      "vote_count": 10001
    }
  ],
  "total_pages": 8687,
  "total_results": 173735
};

export const tvShowsMock: TvShow[] =[
  {
    genre_ids: [
      80,
      18,
      9648
    ],
    id: 2734,
    overview: "In the criminal justice system, sexually-based offenses are considered",
    poster_path: "https://image.tmdb.org/t/p/w500/onmSVwYsPMYtO8OjLdjS8FfRNKb.jpg",
    first_air_date: "Sep 20, 1999",
    name: "Law & Order: Special Victims Unit",
    vote_average: "79.18%",
    genres: "Drama, Crime, Mystery"
  },
  {
    genre_ids: [
      18
    ],
    id: 1416,
    overview: "Follows the personal and professional lives of a group of doctors at Seattle’s ",
    poster_path: "https://image.tmdb.org/t/p/w500/jcEl8SISNfGdlQFwLzeEtsjDvpw.jpg",
    first_air_date: "Mar 27, 2005",
    name: "Grey's Anatomy",
    vote_average: "82.34%",
    genres: "Drama"
  }
];

export const tvShowDetailsResponseMock: TvShowDetailsResponse = {
  "adult": false,
  "backdrop_path": "/dasgPx3OgkxHSQyncKlApfZkpi2.jpg",
  "created_by": [],
  "episode_run_time": [
    80
  ],
  "first_air_date": "1964-08-22",
  "genres": [
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10763,
      "name": "News"
    }
  ],
  "homepage": "https://www.bbc.co.uk/programmes/b007t9y1",
  "id": 224,
  "in_production": true,
  "languages": [
    "en"
  ],
  "last_air_date": "2024-05-11",
  "last_episode_to_air": {
    "id": 5359898,
    "overview": "Gary Lineker presents a bumper edition of Match of the Day as all 20 teams meet",
    "name": "MOTD - May 19th 2023",
    "vote_average": 0.0,
    "vote_count": 0,
    "air_date": "2024-05-19",
    "episode_number": 46,
    "episode_type": "standard",
    "production_code": "",
    "runtime": 110,
    "season_number": 60,
    "show_id": 224,
    "still_path": null
  },
  "name": "Match of the Day",
  "next_episode_to_air": null,
  "networks": [
    {
      "id": 4,
      "logo_path": "/uJjcCg3O4DMEjM0xtno9OWFciRP.png",
      "name": "BBC One",
      "origin_country": "GB"
    }
  ],
  "number_of_episodes": 3166,
  "number_of_seasons": 60,
  "origin_country": [
    "GB"
  ],
  "original_language": "en",
  "original_name": "Match of the Day",
  "overview": "BBC's football highlights and analysis. The longest-running football",
  "popularity": 2172.965,
  "poster_path": "/aA25JrHXj8ZPTJYj2iSIueyb34C.jpg",
  "production_companies": [
    {
      "id": 16986,
      "logo_path": "/nBWSAxcnFYeh5xYWoGtZoEWk8a.png",
      "name": "BBC Sport",
      "origin_country": "GB"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    }
  ],
  "seasons": [
    {
      "air_date": "1964-08-22",
      "episode_count": 37,
      "id": 151809,
      "name": "Season 1964/65",
      "overview": "Match of the Day begins on 22 August 1964, for coverage of Liverpool versus",
      "poster_path": null,
      "season_number": 1,
      "vote_average": 0.0
    }
  ],
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Returning Series",
  "tagline": "",
  "type": "Documentary",
  "vote_average": 7.197,
  "vote_count": 33,
  "videos": {
    "results": [
      {
        "iso_639_1": "en",
        "iso_3166_1": "US",
        "name": "Gary Lineker presents Match of the Day in his pants - BBC Sport",
        "key": "jvWNghDy4Jo",
        "site": "YouTube",
        "size": 1080,
        "type": "Clip",
        "official": false,
        "published_at": "2016-08-14T04:51:37.000Z",
        "id": "65649e6b8f26bc00ad27a669"
      }
    ]
  },
  "credits": {
    "cast": [
      {
        "adult": false,
        "gender": 0,
        "id": 1220503,
        "known_for_department": "Acting",
        "name": "Gary Lineker",
        "original_name": "Gary Lineker",
        "popularity": 10.688,
        "profile_path": "/mfHN34kbcqbkN8zYyfjE5fk5dpX.jpg",
        "character": "Presenter",
        "credit_id": "65649e14706e5600fe0498b9",
        "order": 7
      },
    ],
    "crew": []
  },
  "images": {
    "backdrops": [
      {
        "aspect_ratio": 1.778,
        "height": 1080,
        "iso_639_1": "en",
        "file_path": "/dasgPx3OgkxHSQyncKlApfZkpi2.jpg",
        "vote_average": 5.312,
        "vote_count": 1,
        "width": 1920
      },
    ],
    "logos": [
      {
        "aspect_ratio": 1.863,
        "height": 292,
        "iso_639_1": "en",
        "file_path": "/wBjqEZNxuDdANWWBstezfsw7NrG.png",
        "vote_average": 0.0,
        "vote_count": 0,
        "width": 544
      }
    ],
    "posters": [
      {
        "aspect_ratio": 0.667,
        "height": 1440,
        "iso_639_1": "en",
        "file_path": "/aA25JrHXj8ZPTJYj2iSIueyb34C.jpg",
        "vote_average": 5.318,
        "vote_count": 3,
        "width": 960
      },
    ]
  }
};

export const tvShowDetailsMock: TvShowDetails = {
  "created_by": [],
  "first_air_date": "Aug 22, 1964",
  "genres": "Talk, News",
  "id": 224,
  "name": "Match of the Day",
  "overview": "BBC's football highlights and analysis. The longest-running football",
  "poster_path": "https://image.tmdb.org/t/p/w500/aA25JrHXj8ZPTJYj2iSIueyb34C.jpg",
  "vote_average": "71.97%",
  "videos": {
    "results": [
      {
        "iso_639_1": "en",
        "iso_3166_1": "US",
        "name": "Gary Lineker presents Match of the Day in his pants - BBC Sport",
        "key": "jvWNghDy4Jo",
        "site": "YouTube",
        "size": 1080,
        "type": "Clip",
        "official": false,
        "published_at": "2016-08-14T04:51:37.000Z",
        "id": "65649e6b8f26bc00ad27a669"
      }
    ]
  },
  "credits": {
    "cast": [
      {
        "adult": false,
        "gender": 0,
        "id": 1220503,
        "known_for_department": "Acting",
        "name": "Gary Lineker",
        "original_name": "Gary Lineker",
        "popularity": 10.688,
        "profile_path": "/mfHN34kbcqbkN8zYyfjE5fk5dpX.jpg",
        "character": "Presenter",
        "credit_id": "65649e14706e5600fe0498b9",
        "order": 7
      }
    ],
    "crew": []
  },
  "images": [
    {
      "aspect_ratio": 1.778,
      "height": 1080,
      "iso_639_1": "en",
      "file_path": "/dasgPx3OgkxHSQyncKlApfZkpi2.jpg",
      "vote_average": 5.312,
      "vote_count": 1,
      "width": 1920
    }
  ],
  "cast": [
    {
      "adult": false,
      "gender": 0,
      "id": 1220503,
      "known_for_department": "Acting",
      "name": "Gary Lineker",
      "original_name": "Gary Lineker",
      "popularity": 10.688,
      "profile_path": "https://image.tmdb.org/t/p/w300/mfHN34kbcqbkN8zYyfjE5fk5dpX.jpg",
      "character": "Presenter",
      "credit_id": "65649e14706e5600fe0498b9",
      "order": 7
    }
  ]
};

