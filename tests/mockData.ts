import type {
  Actor,
  ActorDetails,
  ActorDetailsResponse,
  ActorResponse,
  Movie,
  MovieDetails,
  MovieDetailsResponse,
  MovieGenresResponse,
  MovieResponse,
  MultiSearchResponse,
  TvShow,
  TvShowDetails,
  TvShowDetailsResponse,
  TvShowGenresResponse,
  TvShowResponse
} from "@/typings/interfaces";
import type { MultiSearchResponseResult, Nullable } from "@/typings/types";

// ===============================================================================================
// MOVIES
// ===============================================================================================

export const movieGenresResponseMock: MovieGenresResponse = {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
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
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
};

export const popularMoviesResponseMock: MovieResponse = {
  page: 1,
  results: [
    {
      "adult": false,
      "backdrop_path": "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
      "genre_ids": [
        16,
        10751,
        12,
        35,
        18
      ],
      "id": 1022789,
      "original_language": "en",
      "original_title": "Inside Out 2",
      "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to "
        + "make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, "
        + "Fear and Disgust, who’ve long been running a successful operation by all accounts, "
        + "aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
      "popularity": 8656.535,
      "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      "release_date": "2024-06-11",
      "title": "Inside Out 2",
      "video": false,
      "vote_average": 7.708,
      "vote_count": 1578
    },
    {
      "adult": false,
      "backdrop_path": "/zYdVEWpZyG1S1BtMEdOl2W36I7A.jpg",
      "genre_ids": [
        16,
        10751,
        35,
        28
      ],
      "id": 519182,
      "original_language": "en",
      "original_title": "Despicable Me 4",
      "overview": "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member"
        + " to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru "
        + "faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, "
        + "forcing the family to go on the run.",
      "popularity": 6517.251,
      "poster_path": null,
      "release_date": "2024-06-20",
      "title": "Despicable Me 4",
      "video": false,
      "vote_average": 7.613,
      "vote_count": 173
    },
  ],
  total_pages: 1,
  total_results: 2
};

export const nowPlayingMoviesResponseMock: MovieResponse = {
  "dates": {
    "maximum": "2024-07-17",
    "minimum": "2024-06-05"
  },
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
      "genre_ids": [
        16,
        10751,
        12,
        35,
        18
      ],
      "id": 1022789,
      "original_language": "en",
      "original_title": "Inside Out 2",
      "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make "
        + "room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and"
        + " Disgust, who’ve long been running a successful operation by all accounts, aren’t sure "
        + "how to feel when Anxiety shows up. And it looks like she’s not alone.",
      "popularity": 8656.535,
      "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      "release_date": "2024-06-11",
      "title": "Inside Out 2",
      "video": false,
      "vote_average": 7.709,
      "vote_count": 1579
    },
    {
      "adult": false,
      "backdrop_path": "/zYdVEWpZyG1S1BtMEdOl2W36I7A.jpg",
      "genre_ids": [
        16,
        10751,
        35,
        28
      ],
      "id": 519182,
      "original_language": "en",
      "original_title": "Despicable Me 4",
      "overview": "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member "
        + "to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a "
        + "new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the "
        + "family to go on the run.",
      "popularity": 6517.251,
      "poster_path": "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      "release_date": "2024-06-20",
      "title": "Despicable Me 4",
      "video": false,
      "vote_average": 7.613,
      "vote_count": 173
    }
  ],
  "total_pages": 1,
  "total_results": 2
};

export const popularMoviesMock: Movie[] = [
  {
    "genre_ids": [16, 10751, 12, 35, 18],
    "genres": "Adventure, Animation, Drama, Comedy, Family",
    "id": 1022789,
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to "
        + "make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, "
        + "Fear and Disgust, who’ve long been running a successful operation by all accounts, "
        + "aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "poster_path": "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "release_date": "Jun 11, 2024",
    "title": "Inside Out 2",
    "vote_average": "77.08%"
  },
  {
    "genre_ids": [16, 10751, 35, 28],
    "genres": "Animation, Action, Comedy, Family",
    "id": 519182,
    "overview": "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member"
        + " to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru "
        + "faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, "
        + "forcing the family to go on the run.",
    "poster_path": "https://placehold.co/500x750",
    "release_date": "Jun 20, 2024",
    "title": "Despicable Me 4",
    "vote_average": "76.13%"
  }
];

export const nowPlayingMoviesMock: Movie[] = [
  {
    "genre_ids": [16, 10751, 12, 35, 18],
    "genres": "Adventure, Animation, Drama, Comedy, Family",
    "id": 1022789,
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make "
      + "room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and"
      + " Disgust, who’ve long been running a successful operation by all accounts, aren’t sure "
      + "how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "poster_path": "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "release_date": "Jun 11, 2024",
    "title": "Inside Out 2",
    "vote_average": "77.09%"
  },
  {
    "genre_ids": [16, 10751, 35, 28],
    "genres": "Animation, Action, Comedy, Family",
    "id": 519182,
    "overview": "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member "
      + "to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a "
      + "new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the "
      + "family to go on the run.",
    "poster_path": "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    "release_date": "Jun 20, 2024",
    "title": "Despicable Me 4",
    "vote_average": "76.13%"
  }
];

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

export const movieDetailsWithDefaultImagesResponseMock: Nullable<MovieDetailsResponse> = {
  ...movieDetailsResponseMock,
  poster_path: null,
  credits: {
    ...movieDetailsResponseMock.credits,
    cast: [
      {
        ...movieDetailsResponseMock?.credits?.cast[0],
        profile_path: null
      }
    ]
  }
};

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

export const movieDetailsWithDefaultImagesMock: Nullable<MovieDetails> = {
  ...movieDetailsMock,
  poster_path: "https://placehold.co/500x750",
  cast: [
    {
      ...movieDetailsMock.cast[0],
      profile_path: "https://placehold.co/300x450"
    }
  ],
  credits: {
    ...movieDetailsMock?.credits,
    cast: [
      {
        ...movieDetailsMock?.credits?.cast[0],
        profile_path: null
      }
    ]
  }
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
      "backdrop_path": "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
      "genre_ids": [
        10765,
        18,
        10759
      ],
      "id": 94997,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "House of the Dragon",
      "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than "
        + "15 dragons under their yoke. Most empires crumble from such heights. In the case of "
        + "the Targaryens, their slow fall begins when King Viserys breaks with a century of "
        + "tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys "
        + "later fathers a son, the court is shocked when Rhaenyra retains her status as his "
        + "heir, and seeds of division sow friction across the realm.",
      "popularity": 3375.619,
      "poster_path": "/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
      "first_air_date": "2022-08-21",
      "name": "House of the Dragon",
      "vote_average": 8.416,
      "vote_count": 4350
    },
    {
      "adult": false,
      "backdrop_path": "/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
      "genre_ids": [
        10765,
        10759
      ],
      "id": 76479,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "The Boys",
      "overview": "A group of vigilantes known informally as “The Boys” set out to take down "
        + "corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty",
      "popularity": 2894.051,
      "poster_path": null,
      "first_air_date": "2019-07-25",
      "name": "The Boys",
      "vote_average": 8.473,
      "vote_count": 9863
    }
  ],
  "total_pages": 1,
  "total_results": 2
};

export const topRatedTvShowsResponseMock: TvShowResponse = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/9kyyQXy79YRdY5mhrYKyktbFMev.jpg",
      "genre_ids": [
        16,
        35,
        10765
      ],
      "id": 94954,
      "origin_country": [
        "US"
      ],
      "original_language": "en",
      "original_name": "Hazbin Hotel",
      "overview": "In attempt to find a non-violent alternative for reducing Hell's "
        + "overpopulation, the daughter of Lucifer opens a rehabilitation hotel that offers "
        + "a group of misfit demons a chance at redemption.",
      "popularity": 181.679,
      "poster_path": "/rXojaQcxVUubPLSrFV8PD4xdjrs.jpg",
      "first_air_date": "2024-01-18",
      "name": "Hazbin Hotel",
      "vote_average": 8.97,
      "vote_count": 994
    },
    {
      "adult": false,
      "backdrop_path": "/96RT2A47UdzWlUfvIERFyBsLhL2.jpg",
      "genre_ids": [
        16,
        18,
        10759,
        10765
      ],
      "id": 209867,
      "origin_country": [
        "JP"
      ],
      "original_language": "ja",
      "original_name": "葬送のフリーレン",
      "overview": "After the party of heroes defeated the Demon King, they restored peace to "
        + "the land and returned to lives of solitude. Generations pass, and the elven mage "
        + "Frieren comes face to face with humanity’s mortality. She takes on a new apprentice "
        + "and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with "
        + "the nature of life and death? Frieren embarks on her quest to find out.",
      "popularity": 213.796,
      "poster_path": "/dqZENchTd7lp5zht7BdlqM7RBhD.jpg",
      "first_air_date": "2023-09-29",
      "name": "Frieren: Beyond Journey's End",
      "vote_average": 8.9,
      "vote_count": 216
    },
  ],
  "total_pages": 1,
  "total_results": 2
};

export const popularTvShowsMock: TvShow[] = [
  {
    "first_air_date": "Aug 21, 2022",
    "genre_ids": [10765, 18, 10759],
    "genres": "Drama, Action & Adventure, Sci-Fi & Fantasy",
    "id": 94997,
    "name": "House of the Dragon",
    "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than "
      + "15 dragons under their yoke. Most empires crumble from such heights. In the case of "
      + "the Targaryens, their slow fall begins when King Viserys breaks with a century of "
      + "tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys "
      + "later fathers a son, the court is shocked when Rhaenyra retains her status as his "
      + "heir, and seeds of division sow friction across the realm.",
    "poster_path": "https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg",
    "vote_average": "84.16%"
  },
  {
    "first_air_date": "Jul 25, 2019",
    "genre_ids": [10765, 10759],
    "genres": "Action & Adventure, Sci-Fi & Fantasy",
    "id": 76479,
    "name": "The Boys",
    "overview": "A group of vigilantes known informally as “The Boys” set out to take down "
      + "corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty",
    "poster_path": "https://placehold.co/500x750",
    "vote_average": "84.73%"
  }
];

export const topRatedTvShowsMock: TvShow[] = [
  {
    "first_air_date": "Jan 18, 2024",
    "genre_ids": [16, 35, 10765],
    "genres": "Animation, Comedy, Sci-Fi & Fantasy",
    "id": 94954,
    "name": "Hazbin Hotel",
    "overview": "In attempt to find a non-violent alternative for reducing Hell's "
      + "overpopulation, the daughter of Lucifer opens a rehabilitation hotel that offers "
      + "a group of misfit demons a chance at redemption.",
    "poster_path": "https://image.tmdb.org/t/p/w500/rXojaQcxVUubPLSrFV8PD4xdjrs.jpg",
    "vote_average": "89.7%"
  },
  {
    "first_air_date": "Sep 29, 2023",
    "genre_ids": [16, 18, 10759, 10765],
    "genres": "Animation, Drama, Action & Adventure, Sci-Fi & Fantasy",
    "id": 209867,
    "name": "Frieren: Beyond Journey's End",
    "overview": "After the party of heroes defeated the Demon King, they restored peace to "
        + "the land and returned to lives of solitude. Generations pass, and the elven mage "
        + "Frieren comes face to face with humanity’s mortality. She takes on a new apprentice "
        + "and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with "
        + "the nature of life and death? Frieren embarks on her quest to find out.",
    "poster_path": "https://image.tmdb.org/t/p/w500/dqZENchTd7lp5zht7BdlqM7RBhD.jpg",
    "vote_average": "89%"
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

export const tvShowDetailsWithDefaultImagesResponseMock: Nullable<TvShowDetailsResponse> = {
  ...tvShowDetailsResponseMock,
  poster_path: null,
  credits: {
    ...tvShowDetailsResponseMock.credits,
    cast: [
      {
        ...tvShowDetailsResponseMock?.credits?.cast[0],
        profile_path: null
      }
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

export const tvShowDetailsWithDefaultImagesMock: Nullable<TvShowDetails> = {
  ...tvShowDetailsMock,
  poster_path: "https://placehold.co/500x750",
  cast: [
    {
      ...tvShowDetailsMock.cast?.[0],
      profile_path: "https://placehold.co/300x450"
    }
  ],
  credits: {
    ...tvShowDetailsMock?.credits,
    cast: [
      {
        ...tvShowDetailsMock?.credits?.cast[0],
        profile_path: null
      }
    ]
  }
};

// ===============================================================================================
// ACTORS
// ===============================================================================================

export const popularActorsResponseMock: ActorResponse = {
  "page": 1,
  "results": [
    {
      "adult": false,
      "gender": 2,
      "id": 12799,
      "known_for_department": "Acting",
      "name": "Jeremy Piven",
      "original_name": "Jeremy Piven",
      "popularity": 201.728,
      "profile_path": "/pqdR8zqAWF87chGYlbdYr0YfC7g.jpg",
      "known_for": [
        {
          "backdrop_path": "/sd4xN5xi8tKRPrJOWwNiZEile7f.jpg",
          "id": 920,
          "original_title": "Cars",
          "overview": "Lightning McQueen, a hotshot rookie race car driven to succeed, "
            + "discovers that life is about the journey, not the finish line, when he finds "
            + "himself unexpectedly detoured in the sleepy Route 66 town of Radiator Springs. "
            + "On route across the country to the big Piston Cup Championship in California to "
            + "compete against two seasoned pros, McQueen gets to know the town's offbeat "
            + " characters.",
          "poster_path": "/abW5AzHDaIK1n9C36VdAeOwORRA.jpg",
          "media_type": "movie",
          "adult": false,
          "title": "Cars",
          "original_language": "en",
          "genre_ids": [
            16,
            12,
            35,
            10751
          ],
          "popularity": 72.142,
          "release_date": "2006-06-08",
          "video": false,
          "vote_average": 6.967,
          "vote_count": 13554
        },
        {
          "backdrop_path": "/rqpPH5At8AzYUYR2GneC0x65GeK.jpg",
          "id": 9778,
          "original_title": "Serendipity",
          "overview": "Although strangers Sara and Jonathan are both already in relationships, "
            + "they realize they have genuine chemistry after a chance encounter – but part "
            + "company soon after. Years later, they each yearn to reunite, despite being "
            + "destined for the altar. But to give true love a chance, they have to find one "
            + "another again.",
          "poster_path": "/srCE5lEIjVEG5eqWg9JcjZCK1aQ.jpg",
          "media_type": "movie",
          "adult": false,
          "title": "Serendipity",
          "original_language": "en",
          "genre_ids": [
            35,
            10749,
            18
          ],
          "popularity": 24.262,
          "release_date": "2001-10-05",
          "video": false,
          "vote_average": 6.9,
          "vote_count": 1851
        },
        {
          "backdrop_path": "/6bNQuKFJIamipvYclG4MEbDSLM5.jpg",
          "id": 93837,
          "original_title": "So Undercover",
          "overview": "When the FBI hires her to go undercover at a college sorority,"
            + " Molly Morris (Miley Cyrus) must transform herself from a tough, streetwise "
            + "private investigator to a refined, sophisticated university girl to help protect"
            + " the daughter of a one-time Mobster. With several suspects on her list, Molly "
            + " unexpectedly discovers that not everyone is who they appear to be, including "
            + "herself.",
          "poster_path": "/abR6e0FaWwwcEJEM4PY5VvjwBr1.jpg",
          "media_type": "movie",
          "adult": false,
          "title": "So Undercover",
          "original_language": "en",
          "genre_ids": [
            28,
            35
          ],
          "popularity": 12.056,
          "release_date": "2012-12-06",
          "video": false,
          "vote_average": 6.2,
          "vote_count": 1095
        }
      ]
    },
    {
      "adult": false,
      "gender": 2,
      "id": 2786960,
      "known_for_department": "Acting",
      "name": "Gabriel Guevara",
      "original_name": "Gabriel Guevara",
      "popularity": 133.348,
      "profile_path": "/pviRYKEEmoPUfLYwP1VHJ6LQcRg.jpg",
      "known_for": []
    },
    {
      "adult": false,
      "gender": 1,
      "id": 6161,
      "known_for_department": "Acting",
      "name": "Jennifer Connelly",
      "original_name": "Jennifer Connelly",
      "popularity": 96.128,
      "profile_path": null,
      "known_for": [
        {
          "backdrop_path": "/vVBcIN68kFq681b4lObiNJhEVro.jpg",
          "id": 453,
          "original_title": "A Beautiful Mind",
          "overview": "In a decades-spanning biopic, brilliant mathematician John Forbes Nash Jr."
            + " makes history in his field as schizophrenia sets in.",
          "poster_path": "/26uu1IKOs81D7Pfz1iC9FgrwAk9.jpg",
          "media_type": "movie",
          "adult": false,
          "title": "A Beautiful Mind",
          "original_language": "en",
          "genre_ids": [
            18,
            10749
          ],
          "popularity": 36.817,
          "release_date": "2001-12-14",
          "video": false,
          "vote_average": 7.858,
          "vote_count": 9936
        },
        {
          "backdrop_path": "/s5R6kTMfOxkGit96A8lqcDL4uVk.jpg",
          "id": 641,
          "original_title": "Requiem for a Dream",
          "overview": "The drug-induced utopias of four Coney Island residents are shattered"
            + " when their addictions run deep.",
          "poster_path": "/nOd6vjEmzCT0k4VYqsA2hwyi87C.jpg",
          "media_type": "movie",
          "adult": false,
          "title": "Requiem for a Dream",
          "original_language": "en",
          "genre_ids": [
            80,
            18
          ],
          "popularity": 19.243,
          "release_date": "2000-10-06",
          "video": false,
          "vote_average": 8.019,
          "vote_count": 9651
        },
        {
          "backdrop_path": "/5z75Q6nqgwgYfpMB9fVHQcw9gMz.jpg",
          "id": 86834,
          "original_title": "Noah",
          "overview": "A man who suffers visions of an apocalyptic deluge takes measures to "
            + "protect his family from the coming flood.",
          "poster_path": "/trtD17IqSWV9Nbn4OILztc9GuCX.jpg",
          "media_type": "movie",
          "adult": false,
          "title": "Noah",
          "original_language": "en",
          "genre_ids": [
            18,
            12
          ],
          "popularity": 46.131,
          "release_date": "2014-03-07",
          "video": false,
          "vote_average": 5.661,
          "vote_count": 6075
        }
      ]
    },
  ],
  "total_pages": 1,
  "total_results": 2
};

export const popularActorsMock: Actor[] = [
  {
    "id": 12799,
    "known_for": "Cars, Serendipity, So Undercover",
    "name": "Jeremy Piven",
    "profile_path": "https://image.tmdb.org/t/p/w300/pqdR8zqAWF87chGYlbdYr0YfC7g.jpg"
  },
  {
    "id": 2786960,
    "known_for": "",
    "name": "Gabriel Guevara",
    "profile_path": "https://image.tmdb.org/t/p/w300/pviRYKEEmoPUfLYwP1VHJ6LQcRg.jpg",
  },
  {
    "id": 6161,
    "known_for": "A Beautiful Mind, Requiem for a Dream, Noah",
    "name": "Jennifer Connelly",
    "profile_path": "https://ui-avatars.com/api/?size=300&name=Jennifer Connelly"
  },
];

export const actorDetailsResponseMock: ActorDetailsResponse = {
  "adult": false,
  "also_known_as": [
    "杰森·莫玛",
    "제이슨 모모아",
    "Joseph Jason Namakaeha Momoa",
    "Τζόζεφ Τζέισον Ναμακαέχα Μομόα",
    "Τζέισον Μομόα",
    "ジェイソン・モモア",
    "Jason Mamoa",
    "ג'ייסון מומואה",
    "傑森·摩莫亞"
  ],
  "biography": "Joseph Jason Namakaeha Momoa (born August 1, 1979) is an American actor and",
  "birthday": "1979-08-01",
  "deathday": null,
  "gender": 2,
  "homepage": "https://jasonmomoa.com",
  "id": 117642,
  "imdb_id": "nm0597388",
  "known_for_department": "Acting",
  "name": "Jason Momoa",
  "place_of_birth": "Honolulu, Hawaii, USA",
  "popularity": 87.315,
  "profile_path": "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
  "images": {
    "profiles": [
      {
        "aspect_ratio": 0.667,
        "height": 3000,
        "iso_639_1": null,
        "file_path": "/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
        "vote_average": 5.338,
        "vote_count": 13,
        "width": 2000
      },
    ]
  },
  "external_ids": {
    "freebase_mid": "/m/06gh0t",
    "freebase_id": "/en/jason_momoa",
    "imdb_id": "nm0597388",
    "tvrage_id": 35980,
    "wikidata_id": "jasonmomoa",
    "facebook_id": "jasonmomoa",
    "instagram_id": "jasonmomoa",
    "tiktok_id": "jasonmomoa",
    "twitter_id": "jasonmomoa",
    "youtube_id": "jasonmomoa"
  },
  "combined_credits": {
    "cast": [
      {
        "adult": false,
        "backdrop_path": "/6B5bTuZEyLrAYNG1IX1GeBQZP11.jpg",
        "genre_ids": [
          12,
          14,
          28
        ],
        "id": 37430,
        "original_language": "en",
        "original_title": "Conan the Barbarian",
        "overview": "A quest that begins as a personal vendetta for the fierce Cimmerian "
          + "warrior soon turns into an epic battle against hulking rivals, horrific monsters, "
          + "and impossible odds, as Conan realizes he is the only hope of saving the great "
          + "nations of Hyboria from an encroaching reign of supernatural evil.",
        "popularity": 30.757,
        "poster_path": "/vR6PzXsOfewD1kei8gMbepvwWC6.jpg",
        "release_date": "2011-08-17",
        "title": "Conan the Barbarian",
        "video": false,
        "vote_average": 5.301,
        "vote_count": 1798,
        "character": "Conan",
        "credit_id": "52fe46489251416c9104f585",
        "order": 0,
        "media_type": "movie"
      },
      {
        "adult": false,
        "backdrop_path": "/6JxPt3brbwE3IySdL1BtzDYFqo3.jpg",
        "genre_ids": [
          35,
          10767
        ],
        "id": 562,
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_name": "The Ellen DeGeneres Show",
        "overview": "The Ellen DeGeneres Show, often shortened to just Ellen, is an American "
        + "television talk show hosted by comedian/actress Ellen DeGeneres.",
        "popularity": 269.135,
        "poster_path": "/PhUYIGUUk1RzWq2Aw3TqH65McE.jpg",
        "first_air_date": "2003-09-08",
        "name": "The Ellen DeGeneres Show",
        "vote_average": 5.8,
        "vote_count": 154,
        "character": "Self",
        "credit_id": "5253875519c295794021a225",
        "episode_count": 1,
        "media_type": "tv"
      },
    ],
    "crew": [
      {
        "adult": false,
        "backdrop_path": "/5SAozzEWrGcrYmU0il2NO6PohjK.jpg",
        "genre_ids": [
          53,
          18
        ],
        "id": 268060,
        "original_language": "en",
        "original_title": "Road to Paloma",
        "overview": "While Native American Wolf is being pursued by the FBI for having taken",
        "popularity": 10.401,
        "poster_path": "/cM0IitlIIS5kzdUPqyGTvl79TOY.jpg",
        "release_date": "2014-04-12",
        "title": "Road to Paloma",
        "video": false,
        "vote_average": 5.93,
        "vote_count": 114,
        "credit_id": "536b99f8c3a3681241009f3c",
        "department": "Directing",
        "job": "Director",
        "media_type": "movie"
      }
    ]
  }
};

export const actorDetailsMock: ActorDetails = {
  "actor": {
    "biography": "Joseph Jason Namakaeha Momoa (born August 1, 1979) is an American actor and",
    "birthday": "Aug 01, 1979",
    "homepage": "https://jasonmomoa.com",
    "id": 117642,
    "name": "Jason Momoa",
    "place_of_birth": "Honolulu, Hawaii, USA",
    "profile_path": "https://image.tmdb.org/t/p/w500/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
    "age": 44
  },
  "social": {
    "twitter": "https://twitter.com/jasonmomoa",
    "facebook": "https://facebook.com/jasonmomoa",
    "instagram": "https://instagram.com/jasonmomoa",
    "youtube": "https://youtube.com/jasonmomoa",
    "tiktok": "https://tiktok.com/jasonmomoa",
    "wikipedia": "https://www.wikidata.org/wiki/jasonmomoa",
  },
  "knownForMovies": [
    {
      "id": 562,
      "poster_path": "https://image.tmdb.org/t/p/w185/PhUYIGUUk1RzWq2Aw3TqH65McE.jpg",
      "media_type": "tv",
      "title": "The Ellen DeGeneres Show",
      "linkToPage": {
        "name": "tvShow",
        "params": {
          "tvShowId": 562
        }
      }
    },
    {
      "id": 37430,
      "poster_path": "https://image.tmdb.org/t/p/w185/vR6PzXsOfewD1kei8gMbepvwWC6.jpg",
      "media_type": "movie",
      "title": "Conan the Barbarian",
      "linkToPage": {
        "name": "movie",
        "params": {
          "movieId": 37430
        }
      }
    },
  ],
  "credits": [
    {
      "id": 37430,
      "release_date": "2011-08-17",
      "title": "Conan the Barbarian",
      "character": "Conan",
      "release_year": "2011",
      "media_type": "movie",
      "linkToPage": {
        "name": "movie",
        "params": {
          "movieId": 37430
        }
      }
    },
    {
      "id": 562,
      "release_date": "2003-09-08",
      "title": "The Ellen DeGeneres Show",
      "character": "Self",
      "release_year": "2003",
      "media_type": "tv",
      "linkToPage": {
        "name": "tvShow",
        "params": {
          "tvShowId": 562
        }
      }
    }
  ],
  "images": [
    {
      "imageUrl": "https://image.tmdb.org/t/p/w400/6dEFBpZH8C8OijsynkSajQT99Pb.jpg",
    }
  ]
};

export const actorDetailsWithDefaultImagesResponseMock: Nullable<ActorDetailsResponse> = {
  ...actorDetailsResponseMock,
  profile_path: null,
  "external_ids": {
    ...actorDetailsResponseMock?.external_ids,
    "twitter_id": null,
    "facebook_id": null,
    "instagram_id": null,
    "youtube_id": null,
    "tiktok_id": null,
    "wikidata_id": null,
  },
  images: {
    profiles: [
      {
        ...actorDetailsResponseMock?.images?.profiles[0],
        file_path: null
      }
    ],
  },
  combined_credits: {
    ...actorDetailsResponseMock.combined_credits,
    cast: [
      {
        ...actorDetailsResponseMock?.combined_credits?.cast[0],
        title: null,
        poster_path: null,
        character: null,
        release_date: null
      },
      {
        ...actorDetailsResponseMock?.combined_credits?.cast[1],
        name: null,
        poster_path: null,
        character: null,
        first_air_date: null
      }
    ]
  }
};

export const actorDetailsWithDefaultImagesMock: Partial<ActorDetails> = {
  ...actorDetailsMock,
  "actor": {
    ...actorDetailsMock.actor,
    profile_path: "https://placehold.co/500x750"
  },
  "social": {
    ...actorDetailsMock.social,
    "twitter": null,
    "facebook": null,
    "instagram": null,
    "youtube": null,
    "tiktok": null,
    "wikipedia": null
  },
  "knownForMovies": [
    {
      ...actorDetailsMock.knownForMovies[0],
      title: "Untitled",
      poster_path: "https://placehold.co/185x278"
    },
    {
      ...actorDetailsMock.knownForMovies[1],
      title: "Untitled",
      poster_path: "https://placehold.co/185x278"
    }
  ],
  "credits": [
    {
      ...actorDetailsMock.credits[1],
      title: "Untitled",
      character: "",
      release_date: "Future",
      release_year: "Future"
    },
    {
      ...actorDetailsMock.credits[0],
      title: "Untitled",
      character: "",
      release_date: "Future",
      release_year: "Future"
    },
  ],
  "images": [
    {
      imageUrl: "https://placehold.co/400x600"
    },
  ]
};

export const actorDetailsWithoutSocialMock: Partial<ActorDetails> = {
  ...actorDetailsMock,
  "actor": {
    ...actorDetailsMock.actor,
    profile_path: "https://placehold.co/500x750",
    homepage: null
  },
  "social": {
    ...actorDetailsMock.social,
    "twitter": null,
    "facebook": null,
    "instagram": null,
    "youtube": null,
    "tiktok": null,
    "wikipedia": null
  },
  "knownForMovies": [
    {
      ...actorDetailsMock.knownForMovies[0],
      title: "Untitled",
      poster_path: "https://placehold.co/185x278"
    },
    {
      ...actorDetailsMock.knownForMovies[1],
      title: "Untitled",
      poster_path: "https://placehold.co/185x278"
    }
  ],
  "credits": [
    {
      ...actorDetailsMock.credits[1],
      title: "Untitled",
      character: "",
      release_date: "Future",
      release_year: "Future"
    },
    {
      ...actorDetailsMock.credits[0],
      title: "Untitled",
      character: "",
      release_date: "Future",
      release_year: "Future"
    },
  ],
  "images": [
    {
      imageUrl: "https://placehold.co/400x600"
    },
  ]
};

// ===============================================================================================
// MULTI SEARCH
// ===============================================================================================

export const multiSearchResponseMock: MultiSearchResponse = {
  "page": 1,
  "results": [
    {
      "backdrop_path": "/5YLNDnkO0cZZwog2StyR3YmmBPh.jpg",
      "id": 597,
      "title": "Titanic",
      "original_title": "Titanic",
      "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the "
        + "Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. "
        + "Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the "
        + "ship. Rose tells the whole story from Titanic's departure through to its death—on its "
        + "first and last voyage—on April 15, 1912.",
      "poster_path": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      "media_type": "movie",
      "adult": false,
      "original_language": "en",
      "genre_ids": [
        18,
        10749
      ],
      "popularity": 158.129,
      "release_date": "1997-11-18",
      "video": false,
      "vote_average": 7.906,
      "vote_count": 24785
    },
    {
      "backdrop_path": "/tRKZGA5dOOhQKakiShHeKcesZKZ.jpg",
      "id": 39016,
      "name": "Titanic",
      "original_name": "Titanic",
      "overview": "A heart-wrenching journey through Titanic's last moments, featuring both "
        + "fictional and historical characters, ranging from steerage passengers and crew to "
        + "upper class guests and staff.",
      "poster_path": null,
      "media_type": "tv",
      "adult": false,
      "original_language": "en",
      "genre_ids": [
        18
      ],
      "popularity": 20.214,
      "first_air_date": "2012-03-21",
      "vote_average": 5.9,
      "vote_count": 55,
      "origin_country": [
        "GB"
      ]
    },
    {
      "adult": false,
      "gender": 2,
      "id": 6193,
      "known_for": [
        {
          "adult": false,
          "backdrop_path": "/5YLNDnkO0cZZwog2StyR3YmmBPh.jpg",
          "genre_ids": [18, 10749],
          "id": 597,
          "media_type": "movie",
          "original_language": "en",
          "original_title": "Titanic",
          "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the "
            + "Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. "
            + "Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship"
            + " Rose tells the whole story from Titanic's departure through to its death—on its "
            + "first and last voyage—on April 15, 1912.",
          "popularity": 139.97,
          "poster_path": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
          "release_date": "1997-11-18",
          "title": "Titanic",
          "video": false,
          "vote_average": 7.906,
          "vote_count": 24785
        }
      ],
      "known_for_department": "Acting",
      "media_type": "person",
      "name": "Leonardo DiCaprio",
      "original_name": "Leonardo DiCaprio",
      "popularity": 91.919,
      "profile_path": "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
    }
  ],
  "total_pages": 1,
  "total_results": 3
};

export const emptyMultiSearchResponseMock: MultiSearchResponse = {
  "page": 1,
  "results": [],
  "total_pages": 1,
  "total_results": 0
};

export const multiSearchMock: MultiSearchResponseResult[] = [
  {
    "backdrop_path": "/5YLNDnkO0cZZwog2StyR3YmmBPh.jpg",
    "id": 597,
    "title": "Titanic",
    "original_title": "Titanic",
    "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the "
      + "Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. "
      + "Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the "
      + "ship. Rose tells the whole story from Titanic's departure through to its death—on its "
      + "first and last voyage—on April 15, 1912.",
    "poster_path": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "media_type": "movie",
    "adult": false,
    "original_language": "en",
    "genre_ids": [
      18,
      10749
    ],
    "popularity": 158.129,
    "release_date": "1997-11-18",
    "video": false,
    "vote_average": 7.906,
    "vote_count": 24785
  },
  {
    "backdrop_path": "/tRKZGA5dOOhQKakiShHeKcesZKZ.jpg",
    "id": 39016,
    "name": "Titanic",
    "original_name": "Titanic",
    "overview": "A heart-wrenching journey through Titanic's last moments, featuring both "
      + "fictional and historical characters, ranging from steerage passengers and crew to "
      + "upper class guests and staff.",
    "poster_path": null,
    "media_type": "tv",
    "adult": false,
    "original_language": "en",
    "genre_ids": [
      18
    ],
    "popularity": 20.214,
    "first_air_date": "2012-03-21",
    "vote_average": 5.9,
    "vote_count": 55,
    "origin_country": [
      "GB"
    ]
  },
  {
    "adult": false,
    "gender": 2,
    "id": 6193,
    "known_for": [
      {
        "adult": false,
        "backdrop_path": "/5YLNDnkO0cZZwog2StyR3YmmBPh.jpg",
        "genre_ids": [18, 10749],
        "id": 597,
        "media_type": "movie",
        "original_language": "en",
        "original_title": "Titanic",
        "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the "
          + "Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. "
          + "Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship"
          + " Rose tells the whole story from Titanic's departure through to its death—on its "
          + "first and last voyage—on April 15, 1912.",
        "popularity": 139.97,
        "poster_path": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        "release_date": "1997-11-18",
        "title": "Titanic",
        "video": false,
        "vote_average": 7.906,
        "vote_count": 24785
      }
    ],
    "known_for_department": "Acting",
    "media_type": "person",
    "name": "Leonardo DiCaprio",
    "original_name": "Leonardo DiCaprio",
    "popularity": 91.919,
    "profile_path": "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
  }
];

export const emptyMultiSearchMock: MultiSearchResponseResult[] = [];

export const configurationTranslationsMock: string[] = [
  "af-ZA",
  "ar-AE",
  "ar-BH",
  "ar-EG",
  "ar-IQ",
  "ar-JO",
  "ar-LY",
  "ar-MA",
  "ar-QA",
  "ar-SA"
];
