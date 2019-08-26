import axios from 'axios';

class FeedReader {
    
    readFeed() {
        let feedUrl = 'https://anchor.fm/s/9c0ec1c/podcast/rss';
        return axios.get(feedUrl)
            .then(res => {
                const persons = res.data;
                
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
                description: value.querySelector("description").textContent
            });
        } );

        return result;
    }
}

class EpisodeModel {
    title = ''
    description = ''
    link = ''
    creator = ''
    pubDate = ''
    enclosure = ''
    duration = ''
    image = ''
    season = ''
    episode = ''

}

export default FeedReader;