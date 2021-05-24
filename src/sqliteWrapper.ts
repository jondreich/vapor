let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./vapor.db", (err: { message: any }) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.run(
  "CREATE TABLE IF NOT EXISTS wishlist (id text PRIMARY KEY UNIQUE, name text, requestor text, lastSaleAmount number DEFAULT 0)"
);

export async function AddToWishlistDb(
  id: string,
  name: string,
  requestorId: string
) {
  return await new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO wishlist(id, name, requestor) VALUES(\"${id}\", \"${name}\", \"${requestorId}\")`,
      [],
      (err: any) => {
        if (err) {
          reject(err.message);
        }
        resolve(null);
      }
    );
  });
}

export async function DeleteFromWishlistDb(id: string) {
  return await new Promise((resolve, reject) => {
    db.run(`DELETE FROM wishlist WHERE id=\"${id}\"`, [], (err: any) => {
      if (err) {
        reject(err.message);
      }
      resolve(null);
    });
  });
}

export async function GetGameFromWishlist(id: string) {
  let sql = `SELECT * FROM wishlist WHERE id=\'${id}\'`;
  let game = await new Promise((resolve, reject) => {
    try {
      db.get(sql, [], (err: any, row: any) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(row);
      });
    } catch (error) {
      reject(error);
    }
  });

  return game;
}

export async function GetWishlist() {
  let sql = `SELECT * FROM wishlist`;
  let gameNamesString: any[] = await new Promise((resolve, reject) => {
    try {
      db.all(sql, [], (err: { message: any }, rows: any[]) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(rows);
      });
    } catch (err) {
      reject(err);
    }
  });

  return gameNamesString;
}

export async function UpdateLastSaleAmount(id: string, saleAmount: number) {
  let sql = `UPDATE wishlist SET lastSaleAmount=${saleAmount} WHERE id=\'${id}\'`;
  return await new Promise((resolve, reject) => {
    db.run(sql, [], (err: any) => {
      if (err) {
        reject(err.message);
      }
      resolve(null);
    });
  });
}
