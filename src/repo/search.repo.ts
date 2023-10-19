const WIKI_URL =
  "/api/w/api.php?action=query&format=json&list=search&srsearch=";

export const getSearchApi = async (
  query: string
): Promise<SearchAPIResponseElement[]> => {
  try {
    const res: Response = await fetch(`${WIKI_URL}${query}`, { method: "GET" });
    const json: SearchAPIResponse = await res.json();
    return json.query.search;
  } catch (e) {
    // Not for production
    console.error(e);
    return [];
  }
};

const WIKI_OF_THE_DAY_URL = "/wikimedia/feed/v1/wikipedia/en/featured/";
let date = new Date()
let day = date.getDate()
let year = date.getFullYear()
let month = date.getMonth() + 1

export const getArticleOfTheDay = async (): Promise<ArticleOfTheDay | null> => {
  try {
    // fetch API
    const res: Response = await fetch(`${WIKI_OF_THE_DAY_URL}${year}/${month}/${day}`, { method: "GET" }); // INSERT API URL
    const json: ArticleOfTheDayAPIResponse = await res.json();
    return {
      title: json.tfa.title,
      extract: json.tfa.extract,
      pageid: json.tfa.pageid
    }
  } catch (e) {
    // Not for production
    console.error(e);
    return null;
  }
};



const WIKI_DETAIL_URL = "/api/w/api.php?action=parse&format=json&prop=text&pageid=";

export const getArticleDetail = async (pageId: number): Promise<ArticleDetailText | null> => {
  try {
    // fetch API
    const res: Response = await fetch(`${WIKI_DETAIL_URL}${pageId}`, { method: "GET" }); // INSERT API URL
    const json: ArticleDetail = await res.json();
    return json.parse.text["*"]
  } catch (e) {
    // Not for production
    console.error(e);
    return null;
  }
};
