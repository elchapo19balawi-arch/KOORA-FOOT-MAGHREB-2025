const Parser = require("rss-parser");
const parser = new Parser({
  customFields: {
    item: ["description", "image"]
  }
});

exports.handler = async () => {
  try {
    const feedUrls = [
      "https://www.filgoal.com/rss/news",
      "https://www.yallakora.com/rss/News"
    ];

    let articles = [];

    for (const url of feedUrls) {
      const feed = await parser.parseURL(url);
      articles = articles.concat(
        feed.items.map(item => ({
          title: item.title,
          link: item.link,
          description: item.description,
          date: item.pubDate,
          source: feed.title
        }))
      );
    }

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      statusCode: 200,
      body: JSON.stringify(articles.slice(0, 20))
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};