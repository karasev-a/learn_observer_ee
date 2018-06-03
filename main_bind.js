
class Observable {
    constructor() {
        this._subscribers = [];
        this._onceSubscribers = [];
    }

    static count(){
        return this.countPublish;
    }

    subscribe(callback) {
        this._subscribers.push(callback);
        console.log(callback.name);
    };

    unsubscribe(callback) {
        this._subscribers = this._subscribers.filter(subscriber => subscriber !== callback);
    };

    once(callback) {
        this._onceSubscribers.push(callback);
    }

    publish(news) {
        this._subscribers.forEach(
            subscriber => subscriber(news)
        );
        if(this._onceSubscribers.length > 0){
            this._onceSubscribers.forEach(onceSubcriber => onceSubcriber(news));
            this._onceSubscribers = [];
        }
        
    }
}

class User {
    constructor(name) {
        this._name = name;
        this.getNews = this.getNews.bind(this);
    }

    getNews(news) {
        console.log(`${news}  for ${this._name}`);
    };

}

class PublisherNews {
    constructor() {
        this._news = []
        this._counterNews = 0;
    }

    createNews() {
        let news = "";
        this._counterNews++;
        news = `News # ${this._counterNews}`;
        this._news.push(news);
        return news;
    }
}

let dailyNews = new PublisherNews();

let alex = new User("alex");
let den = new User("den");
let sam = new User("sam");

let observable = new Observable();

observable.subscribe(alex.getNews);
observable.subscribe(den.getNews);
observable.subscribe(sam.getNews);

observable.publish(dailyNews.createNews()); 
observable.unsubscribe(alex.getNews);
observable.publish(dailyNews.createNews());
observable.publish(dailyNews.createNews());
observable.once(alex.getNews);
observable.publish(dailyNews.createNews());
observable.publish(dailyNews.createNews());

console.log("------");
