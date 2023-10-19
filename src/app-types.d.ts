type AppStateType = {
  query: string;
  results: Array<SearchAPIResponseElement>; // SearchAPIResponseElement[]
  loading: boolean;
  articleOfTheDay: ArticleOfTheDay | null;
};

type SearchAPIResponseElement = {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
};

type SearchAPIResponse = {
  batchcomplete: string;
  continue: {
    sroffset: number;
    continue: string;
  };
  query: {
    searchinfo: {
      totalhits: number;
    };
    search: Array<SearchAPIResponseElement>;
  };
};

type ArticleOfTheDayAPIResponse = {
  tfa: ArticleOfTheDay;
};

type ArticleOfTheDay = {
  title: string;
  extract: string;
  pageid: number | null;
};

type ArticleDetail = {
  parse: {
    "title": string,
    "pageid": number,
    "text": ArticleDetailText
  }
}

type ArticleDetailText = {
  "*": string
}