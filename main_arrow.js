

class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    };
    
    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback); //Don't delete subscriber
    };
    
    publish(news) {
        this.subscribers.forEach(subscriber => { subscriber(news) });
    }
}

class User {
    constructor(name) {
        this.name = name;
    }

    getNews(news) {
       return (news) => {console.log(news + " for " + this.name); };
       //return this;
    };

}

class PublisherNews {
    constructor() {
        this.news = []
        this.counterNews = 0;
    }

    createNews() {
        let news = "";
        this.counterNews++;
        news = "News # " + this.counterNews
        this.news.push(news);
        return news;
    }


}


let dailyNews = new PublisherNews();

let user1 = new User("alex");
let user2 = new User("den");
let user3 = new User("sam");

let observable = new Observable();
user11 = user1.getNews.bind(user1);

observable.subscribe(user1.getNews());
observable.subscribe(user2.getNews());
observable.subscribe(user3.getNews());
console.log(observable.subscribers);

observable.publish(dailyNews.createNews());
observable.unsubscribe(user2.getNews());
observable.publish(dailyNews.createNews());

console.log("------");





