
class Observable {
    constructor() {
        this._subscribers = [];
        this._onceSubscribers = [];
        this._evenSubscribers = [];
        this._countPublish = 0;
    }

    subscribe(callback) {
        this._subscribers.push(callback);
    };

    unsubscribe(callback) {
        this._subscribers = this._subscribers.filter(subscriber => subscriber !== callback);
    };

    once(callback) {
        this._onceSubscribers.push(callback);
    }

    publish(news) {
        this._countPublish++;
        this._subscribers.forEach(subscriber => subscriber(news));
        if((this._countPublish % 2) == 0){
            this._evenSubscribers.forEach(evenSubscriber => evenSubscriber(news));
        }
        if(this._onceSubscribers.length > 0){
            this._onceSubscribers.forEach(onceSubcriber => onceSubcriber(news));
            this._onceSubscribers = [];
        }
        
    }

    evenSubscribe(callback){
        this._evenSubscribers.push(callback);

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
    constructor(observable) {
        this._news = []
        this._counterNews = 0;
        this._observable = observable;
    }

    createNews() {
        let news = "";
        this._counterNews++;
        news = `News # ${this._counterNews}`;
        this._news.push(news);
        this._observable.publish(news);
        return news;
    }
}



let alex = new User("alex");
let den = new User("den");
let sam = new User("sam");

let observable = new Observable();

let dailyNews = new PublisherNews(observable);

observable.subscribe(alex.getNews);
observable.subscribe(den.getNews);
observable.evenSubscribe(sam.getNews);

// observable.publish(dailyNews.createNews()); 
// observable.unsubscribe(alex.getNews);
// observable.publish(dailyNews.createNews());
// observable.publish(dailyNews.createNews());
// observable.once(alex.getNews);
// observable.publish(dailyNews.createNews());
// observable.publish(dailyNews.createNews());

dailyNews.createNews();
observable.unsubscribe(alex.getNews);
dailyNews.createNews();
dailyNews.createNews();
observable.once(alex.getNews);
dailyNews.createNews();
dailyNews.createNews();


console.log("------");
