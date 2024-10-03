# Client-Site Path Traversal Playground

[![Doyensec Research Island](https://img.shields.io/static/v1?logo=data:image/png;base64,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&link=https://doyensec.com/research.html&message=Research%20Island&&label=Doyensec&color=purple)](https://doyensec.com/research.html)


# :rocket: Introduction

Welcome to the **CSPT Playground**, an app that provides the opportunity to learn, find and exploit Client-Side Path Traversal (CSPT).

Client-Side Path Traversal (CSPT) is a vulnerability that allows an attacker to manipulate the file paths used by a client-side application. This can lead to various vulnerabilities: including Cross-Site Scripting, leaks of sensitive data and Cross-Site Request Forgery and many others.

This app is a playground specifically designed to demonstrate and exploit Client-Side Path Traversal vulnerabilities. It provides a platform to experiment with multiple exploits, such as CSPT2CSRF (Client-Side Path Traversal to Cross-Site Request Forgery) and CSPT2XSS (Client-Side Path Traversal to Cross-Site Scripting).

Various gadgets and sinks have been implemented within this app to showcase the potential risks and consequences of CSPT. Other sources, such as store CSPT or other impacts have not been covered yet such as prototype pollution, DOM clobbering, etc...

If you're still new to CSPT, make sure to read our [blog post](https://blog.doyensec.com/2024/07/02/cspt2csrf.html) and [whitepaper](https://www.doyensec.com/resources/Doyensec_CSPT2CSRF_Whitepaper.pdf).

I hope you will like it, happy exploitation!

# :mag_right:  How to use it

```bash
docker compose up
```

The React application is accessible at http://localhost:3000 and the Express API at http://localhost:8000 
  
# :scroll: Developing

You can run the services without docker.

```bash
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server
cd ./backend/app/ && npm install && npm start
cd ./frontend/app/ && npm install && npm start
```

# :handshake: Contributing

CSPT Playground thrives on community contributions. Whether you're a developer, researcher, designer, or bug hunter, your expertise is invaluable to us. We welcome bug reports, feedback, and pull requests. Your participation helps us continue to improve the application, making it a stronger tool for the community.

Interactions are best carried out through the GitHub issue tracker, but you can also reach us on social media ([@Doyensec](https://twitter.com/Doyensec)). We look forward to hearing from you!

# :busts_in_silhouette: Contributors

A special thanks to our contributors. Your dedication and commitment have been instrumental in making this extension what it is today.

Current:
- **Maintainer:** Maxence Schmitt [@maxenceschmitt (Twitter)](https://twitter.com/maxenceschmitt)

This project was made with the support of [Doyensec](https://doyensec.com/research.html).

![Doyensec Research](https://github.com/doyensec/inql/blob/master/docs/doyensec_logo.svg)   


