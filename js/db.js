let dbPromised = idb.open("team", 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains("articles")) {
        var teams = upgradeDb.createObjectStore("articles", { keyPath: "id" });
    }
    if (!upgradeDb.objectStoreNames.contains("matches")) {
        var matches = upgradeDb.createObjectStore("matches", { keyPath: "id" });
    }
    teams.createIndex("post_title", "post_title", {
        unique: false
    });
    matches.createIndex("post_title", "post_title", {
        unique: false
    });
});

const saveForLater = (article) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("articles", "readwrite");
                tx.objectStore("articles").put(article);
                return tx;
            })
            .then((tx) => {
                if (tx.complete) {
                    console.log("Artikel berhasil di simpan.");
                    resolve(true)
                } else {
                    reject(new Error(tx.onerror))
                }
            });
    })
}

const saveMatch = (article) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("matches", "readwrite");
                tx.objectStore("matches").put(article);
                return tx;
            })
            .then((tx) => {
                if (tx.complete) {
                    console.log("Artikel berhasil di simpan.");
                    resolve(true)
                } else {
                    reject(new Error(tx.onerror))
                }
            });
    })
}

const getAllTeam = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("articles", "readonly");
                let store = tx.objectStore("articles");
                return store.getAll();
            })
            .then((data) => {
                if (data !== undefined) {
                    resolve(data)
                } else {
                    reject(new Error("Undefined"))
                }
            });
    });
}

const getAllMatch = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("matches", "readonly");
                let store = tx.objectStore("matches");
                return store.getAll();
            })
            .then((data) => {
                if (data !== undefined) {
                    resolve(data)
                } else {
                    reject(new Error("Undefined"))
                }
            });
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("articles", "readwrite");
                let store = tx.objectStore("articles");
                store.delete(id)
                return tx;
            })
            .then((tx) => {
                if (tx.complete) {
                    alert('Berhasil dihapus')
                    resolve(true)
                } else {
                    reject(new Error(tx.onerror))
                }
            })
    })
}

const deleteMatchById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("matches", "readwrite");
                let store = tx.objectStore("matches");
                store.delete(id)
                return tx;
            })
            .then((tx) => {
                if (tx.complete) {
                    alert('Berhasil dihapus')
                    window.location('')
                    resolve(true)
                } else {
                    reject(new Error(tx.onerror))
                }
            })
    })
}