let base_url = "https://api.football-data.org/v2/";

const status = (response) => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = (response) => {
    return response.json();
}

const error = (error) => {
    console.log("Error : " + error);
}


const getArticles = () => {
    if ("caches" in window) {
        caches.match(base_url + "teams/", { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
            .then((response) => {
                if (response) {
                    response.json().then((data) => {
                        getArticleHtml(data)
                    });
                }
            });
    }

    fetchApi()
}

const fetchApi = function() {
    return fetch(`${base_url}teams/`, {
            headers: {
                'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32'
            }
        })
        .then(status)
        .then(json)
        .then((data) => {
            getArticleHtml(data)
        })
        .catch(error);
};

const getArticleHtml = (data) => {
    let teams = data.teams;
    let articlesHTML = "";

    teams.forEach((article) => {
        articlesHTML += `
          <div class="col s12 m4 ">
            <div class="card">
              <a href="./article.html?id=${article.id}">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="responsive-img" src="${article.crestUrl}" style="min-height: 450px;" alt="Footbal Teams">
                </div>
              </a>
              <div class="card-content">
                <span class="card-title truncate"><b>${article.shortName}</b></span>
                <p>${article.address}</p>
                <a href="./article.html?id=${article.id}" class="blue-grey darken-4 btn-small">Detail</a>
              </div>
            </div>
          </div>
        `;
    });
    document.getElementById("articles").innerHTML = articlesHTML;
}

const getArticleById = () => {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam, { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
                .then((response) => {
                    if (response) {
                        response.json().then((data) => {
                            let articleHTML = `
                          <div class="row card">
                            <div class="col s12 m4 l2"></div>
                            <div class="col s12 m4 l8">
                                <div class="card-image waves-effect waves-block waves-light">
                                  <img src="${data.crestUrl}" alt="Football Flag">
                                </div>
                            </div>
                            <div class="col s12 m4 l2"></div>
                          </div>
                          <div class="row">
                            <div class="col s12 m4 l8 card">
                                <div class="card-content">
                                  <span class="card-title"><b>${data.shortName}</b></span>
                                  ${data.address}
                                </div>
                            </div>
                            <div class="col s12 m4 l4">
                              <div class="card">
                                <div class="card-content">
                                  <span class="card-title">Squad</span>
                                  <div id="squad"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        `;

                            document.getElementById("body-content").innerHTML = articleHTML;
                            resolve(data);
                        });
                    }
                });
        }

        fetch(base_url + "teams/" + idParam, { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
            .then(status)
            .then(json)
            .then(function(data) {

                let articleHTML = `
                  <div class="row card">
                    <div class="col s12 m4 l2"></div>
                    <div class="col s12 m4 l8">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${data.crestUrl}" alt="Football Flag">
                        </div>
                    </div>
                    <div class="col s12 m4 l2"></div>
                  </div>
                  <div class="row">
                    <div class="col s12 m4 l8 card">
                        <div class="card-content">
                          <span class="card-title"><b>${data.shortName}</b></span>
                          ${data.address}
                        </div>
                    </div>
                    <div class="col s12 m4 l4">
                      <div class="card">
                        <div class="card-content">
                          <span class="card-title">Squad</span>
                          <ul class="collection" id="squad"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                `;

                document.getElementById("body-content").innerHTML = articleHTML;

                let squad = data.squad
                let wadahSquad = ""

                squad.forEach((result) => {
                    wadahSquad += `
                      <li class="collection-item">${result.name}</li>
                    `
                })
                document.getElementById("squad").innerHTML = wadahSquad;

                resolve(data);
            });
    });
}

const getSavedArticles = () => {
    getAllTeam().then((articles) => {
        let articlesHTML = "";

        articles.forEach((article) => {
            articlesHTML += `
              <div class="row">
              <div class="col m4">
              <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl}" alt="Football Flag">
                  </div>
                <div class="card-content">
                  <span class="card-title truncate">${article.shortName}</span>
                  <p>${article.address}</p>
                  <div class="devider"></div>
                  <a class="red darken-4 btn" onclick="deleteById(${article.id})">Hapus</a>
                </div>
              </div>
            </div>
              </div>
            `;
        });
        document.getElementById("body-content").innerHTML = articlesHTML;
    });
}

const getSavedMatch = () => {
    getAllMatch().then((articles) => {
        let articlesHTML = "";

        articles.forEach((article) => {
            articlesHTML += `
        <div class="row card">
                    <div class="col s12 m4 l2"></div>
                    <div class="col s12 m4 l8">
                        <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.competition.area.ensignUrl}" alt="Football Flag">
                        </div>
                    </div>
                    <div class="col s12 m4 l2"></div>
                  </div>
                  <div class="row">
                    <div class="col s12 m4 l8 card">
                        <div class="card-content">
                        <ul class="collection">
                        <li class="collection-item">Liga: ${article.competition.name}</li>
                        <li class="collection-item">Area: ${article.competition.area.name}</li>
                      </ul>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 center-align">
                    <span class="card-title">Jadwal</span>
                    <ul class="collection">
                        <li class="collection-item">Status: ${article.status}</li>
                        <li class="collection-item">Mulai: ${article.season.startDate}</li>
                        <li class="collection-item">Selesai: ${article.season.endDate}</li>
                        <li class="collection-item">${article.homeTeam.name} VS ${article.awayTeam.name}</li>
                      </ul>
                    </div>
                  </div>
                  <a class="red darken-4 btn" onclick="deleteMatchById(${article.id})">Hapus</a>
                  <div class="devider"></div>
          <div class="row">
        `;
        });
        document.getElementById("body-content").innerHTML = articlesHTML;

    });
}

const jadwal = () => {
    console.log('okoc')
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(base_url + "matches/", { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
                .then(function(response) {
                    if (response) {
                        response.json().then(({ matches }) => {
                            let articlesHTML = "";
                            matches.forEach(function(data) {
                                articlesHTML += `
                                <div class="row">
                                <div class="col s12 m6">
                                  <div class="card">
                                    <div class="card-image">
                                        <img src="${data.competition.area.ensignUrl}" alt="Football Flag">
                                    </div>
                                    <div class="card-content white-text blue-grey darken-4">
                                      <span class="card-title"><b>${data.competition.name}</b></span>
                                      <span><a href="./match.html?id=${data.id}" class="btn">Detail</a></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            `;
                            });
                            document.getElementById("articles").innerHTML = articlesHTML;

                        });
                    }
                });
        }

        fetch(base_url + "matches/", { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
            .then(status)
            .then(json)
            .then((data) => {
                console.log(data);
                let matches = data.matches;
                let sliceMatch = matches.slice(0, 10)

                let articlesHTML = "";

                sliceMatch.forEach((data) => {
                    console.log(data.competition.area.ensignUrl)
                    articlesHTML += `
                      <div class="row">
                        <div class="col s12 m6 l6">
                          <div class="card">
                            <div class="card-image">
                                <img src="${data.competition.area.ensignUrl}" alt="Football Flag">
                            </div>
                            <div class="card-content white-text blue-grey darken-4">
                              <span class="card-title"><b>${data.competition.name}</b></span>
                              <span><a href="./match.html?id=${data.id}" class="btn">Detail</a></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    `;
                });

                document.getElementById("articles").innerHTML = articlesHTML;

            })
            .catch(error);
    })
}

function getMatch() {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(base_url + "matches/" + idParam, { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
                .then(function(response) {
                    if (response) {
                        response.json().then(({ match }) => {
                            let articleHTML = `
                          <div class="row card">
                            <div class="col s12 m4 l2"></div>
                            <div class="col s12 m4 l8">
                                <div class="card-image waves-effect waves-block waves-light">
                                <img src="${match.competition.area.ensignUrl}" alt="Football Flag">
                                </div>
                            </div>
                            <div class="col s12 m4 l2"></div>
                          </div>
                          <div class="row">
                            <div class="col s12 m4 l8 card">
                                <div class="card-content">
                                <ul class="collection">
                                <li class="collection-item">Liga: ${match.competition.name}</li>
                                <li class="collection-item">Area: ${match.competition.area.name}</li>
                              </ul>
                                </div>
                            </div>
                            <div class="col s12 m4 l4 center-align">
                            <span class="card-title">Jadwal</span>
                            <ul class="collection">
                                <li class="collection-item">Status: ${match.status}</li>
                                <li class="collection-item">Mulai: ${match.season.startDate}</li>
                                <li class="collection-item">Selesai: ${match.season.endDate}</li>
                                <li class="collection-item">${match.homeTeam.name} VS ${match.awayTeam.name}</li>
                              </ul>
                            </div>
                          </div>
                      `;

                            document.getElementById("body-content").innerHTML = articleHTML;
                            let okoc = match
                            resolve(okoc);
                        })
                    }
                });
        }

        fetch(base_url + "matches/" + idParam, { headers: { 'X-Auth-Token': 'c5dc028baca346c2a7a1a496ca7d3e32' } })
            .then(status)
            .then(json)
            .then(({ match }) => {
                let articleHTML = `
                <div class="row card">
                    <div class="col s12 m2 l2"></div>
                    <div class="col s12 m8 l8">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${match.competition.area.ensignUrl}" style="padding: 20px;" alt="Football Flag">
                        </div>
                    </div>
                    <div class="col s12 m2 l2"></div>
                  </div>
                  <div class="row card">
                    <div class="col s12 m8 l8 center-align">
                        <div class="card-content">
                        <span class="card-title"><b>Informasi</b></span>
                        <ul class="collection">
                        <li class="collection-item">Liga: ${match.competition.name}</li>
                        <li class="collection-item">Area: ${match.competition.area.name}</li>
                      </ul>
                        </div>
                    </div>
                    <div class="col s12 m4 l4 center-align">
                    <span class="card-title"><b>Jadwal</b></span>
                    <ul class="collection">
                        <li class="collection-item">Status: ${match.status}</li>
                        <li class="collection-item">Mulai: ${match.season.startDate}</li>
                        <li class="collection-item">Selesai: ${match.season.endDate}</li>
                        <li class="collection-item">${match.homeTeam.name} VS ${match.awayTeam.name}</li>
                      </ul>
                    </div>
                  </div>
                    `;

                document.getElementById("body-content").innerHTML = articleHTML;
                let okoc = match
                resolve(okoc);
            });
    });
}