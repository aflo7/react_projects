import React from "react"
import "../styles/news.css"
import { newsData } from "../data/newsData"

function News() {
  console.log(newsData)
  return (
    <div className="news-wrapper">
      <div className="news-title">News</div>

      {newsData.articles.map((elem, i) => {
        return (
          <a href={elem.url} target="_blank" key={i} rel="noreferrer">
            <div className="individual-news" >
              <img
                alt=""
                src={elem.urlToImage}
                width="40px"
                height="40px"
              />
              <div className="individual-news-title">{elem.title}</div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default News
