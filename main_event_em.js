
class EventEm {
    constructor() {
        this._subscribers = new Object();
    }

    subscribe(nameSpace, callback) {
        if (!this._subscribers[nameSpace]) {
            this._subscribers[nameSpace] = [];
        }
        this._subscribers[nameSpace].push(callback);
    };

    unsubscribe(nameSpace, callback) {
        if (this._subscribers[nameSpace]) {
            let indexSub = this._subscribers[nameSpace].indexOf(callback);
            if (indexSub >= 0) {
                this._subscribers[nameSpace].splice(indexSub, 1);
            }
            //this._subscribers[key] = this._subscribers[key].filter(subscriber => subscriber !== callback);
        }
        if (this._subscribers[nameSpace].length == 0) {
            delete this._subscribers[nameSpace];
        }
    };

    publish(nameSpace, news) {
        if (this._subscribers[nameSpace]) {
            this._subscribers[nameSpace].forEach(subscriber => subscriber(nameSpace, news));
        }
    }
}

class User {
    constructor(name) {
        this._name = name;
        this.getNews = this.getNews.bind(this);
    }

    getNews(category, news) {
        console.log(`${category}: ${news}  for ${this._name}`);
    };

}

class PublisherNews {
    constructor(eventEm) {
        this._publications = []
        this._counterNews = 0;
        this._eventEm = eventEm;
    }

    createNews(category) {
        let news = "";
        this._counterNews++;
        news = `News # ${this._counterNews}`;
        let publication = {
            category,
            news
        }
        this._publications.push(publication);
        this._eventEm.publish(category, news);
        return publication;
    }
}

let alex = new User("alex");
let den = new User("den");
let sam = new User("sam");

let ee = new EventEm();

let dailyNews = new PublisherNews(ee);
ee.subscribe("sport", alex.getNews);
ee.subscribe("sport", den.getNews);
ee.subscribe("it", sam.getNews);
ee.subscribe("sport", sam.getNews);
ee.subscribe("fishin", alex.getNews);

dailyNews.createNews("sport");
dailyNews.createNews("it");
dailyNews.createNews("fishin");

ee.unsubscribe("sport", alex.getNews);

dailyNews.createNews("sad");
dailyNews.createNews("fishin");
dailyNews.createNews("sport");

dailyNews.createNews("it");