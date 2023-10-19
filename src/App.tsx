import { Component } from 'react'
import './App.css'
import { getArticleOfTheDay, getSearchApi, getArticleDetail } from './repo/search.repo'

class App extends Component<object, AppStateType> {
  constructor(props: object) {
    super(props)
    this.state = {
      query: '',
      results: [],
      loading: false,
      articleOfTheDay: null
    }
  }

  // Eseguito al Mount del componente
  componentDidMount(): void {
    this.getArticleOfTheDay()
  }

  componentDidUpdate(prevProps: object, prevState: AppStateType): void {
    const { loading } = this.state
    if (prevState.loading !== loading) {
      console.log("Loading changed to", loading)
    }
    if (prevState.loading === true && loading === false) {
      console.log("Results loaded")
    }
  }

  getArticleOfTheDay() {
    this.setState({ loading: true }, () => {
      getArticleOfTheDay().then((articleOfTheDay) => {
        this.setState({articleOfTheDay: articleOfTheDay, loading: false})
      })
    })
  }

  handleArticleDetail (pageId: number) {
    getArticleDetail(pageId).then((articleDetail) => {
        console.log(articleDetail)
    })
  }

  handleInputChange(value: string) {
    this.setState({ query: value })
  }

  handleButtonClick() {
    const { query } = this.state
    this.setState({ loading: true }, () => {
      getSearchApi(query).then((results) => {
        this.setState({ results: results, loading: false})
      })
    })
  }

  render() {
    const { query, results, loading, articleOfTheDay } = this.state
    return <div>
      <h1> Wikipedia Search</h1>
      {/* {articleOfTheDay && <div> ... */}
      <input
        type='text'
        placeholder='Type here...'
        onChange={(event) => this.handleInputChange(event.target.value)}
        value={query}
        disabled={loading} />
      <button onClick={() => this.handleButtonClick()} disabled={loading}>Search</button>

      {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}

      <div className="article-of-the-day" >
        <h3>{articleOfTheDay?.title ?? "Nessun titolo disponibile"}</h3>
        <p>{articleOfTheDay?.extract ?? "Nessuna descrizione disponibile"}</p>
      </div>

      {results.map((el, i) => (<div key={i}>
        <h3>{el.title}</h3>
        <button onClick={() => this.handleArticleDetail(el.pageid)}>cliccami</button>
        <div>{el.snippet.replace(/<[^>]+>/g, '')}</div>
        <div>{el.pageid}</div>
      </div>))}
    </div>
  }
}

export default App
