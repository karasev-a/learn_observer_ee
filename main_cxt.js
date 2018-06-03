

class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback, context) {
        var ctx = context || null;
        this.subscribers.push({callback:callback, context:ctx});
        console.log(this.subscribers);
        
    };
    
    unsubscribe(callback, context) {
        this.subscribers = this.subscribers.filter(
            subscriber => {
                let res = true;
                if (subscriber.context.unsubscribeFromNews === callback) {
                    if (subscriber.context == context) {
                        res = false;
                        subscriber.context.unsubscribeFromNews();
                    }
                }
                return res;
            });
    };
    
    publish(news) {
        for (var i in this.subscribers) {
            var item = this.subscribers[i];
            item.callback.call(item.context, news);
        }
    }
}

class User {
    constructor(name) {
        this.name = name;
    }

    getNews(news) {
        console.log(news + " for " + this.name);
    };

    unsubscribeFromNews() {
        console.log("User " + this.name + " unsubscribed!")
    }
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

observable.subscribe(user1.getNews);
observable.subscribe(user2.getNews, user2);
observable.subscribe(user3.getNews, user3);
observable.publish(dailyNews.createNews());
observable.unsubscribe(user2.unsubscribeFromNews, user2);
observable.publish(dailyNews.createNews());

console.log("------");





