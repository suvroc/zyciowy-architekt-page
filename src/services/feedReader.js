import axios from 'axios';
import React from "react";

class FeedReader {
    
    readFeed() {
        let cachedItem = localStorage.getItem("podcast-feed")
        if (cachedItem != null) {
            
            return Promise.resolve(this.buildModel(JSON.parse(cachedItem).data));
        }
        let feedUrl = 'https://anchor.fm/s/9c0ec1c/podcast/rss';
        return axios.get(feedUrl)
            .then(res => {
                localStorage.setItem("podcast-feed", JSON.stringify({
                    updateTime: new Date(),
                    data: res.data
                }));
                return this.buildModel(res.data);
            })
    }

    buildModel(text) {
        const parser = new DOMParser();
        let xmlFile = parser.parseFromString(text, "text/xml");
        let result = [];
        xmlFile.querySelectorAll("item").forEach((value, key, parent) => {
            result.push({
                title: value.querySelector("title").textContent,
                description: value.querySelector("description").textContent,
                reference: React.createRef(),
                link: value.querySelector("link").textContent,
                guid: value.querySelector("guid").textContent,
                pubdate: value.querySelector("pubDate").textContent,
                enclosure : value.querySelector("enclosure").textContent,
                embedlink: value.querySelector("link").textContent.replace("/episodes", "/embed/episodes"),
                image: value.querySelector('*|image').getAttribute("href")
            });
        } );

        return result;
    }
}

export default FeedReader;