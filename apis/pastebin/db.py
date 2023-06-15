import sqlite3
from sqlite3 import Connection
import logging

import base64, hashlib
import datetime, time

logging.basicConfig(format="%(process)d-%(levelname)s-%(message)s", level=logging.DEBUG)


class Paste:
    """

    Paste

    a Paste is the model used to capture all relevant informations about
    stuff being posted to the Pastebin

    id: six(6) first characters of the Pasted content hashed with MD5

    paste: the content being saved to the Pastebin

    badge(optionnal): some kind of user submitted identifier used to regroup
    pastes together. in order to avoid a badge getting usurped by another user,
    the value is hashed with same function as the 'id' field

    insert_timestamp: Unix timestamp

    """

    def __init__(self, paste, badge: str = ""):
        self.id = self._hash(paste)
        self.paste = paste
        self.badge = self._hash(badge)
        self.insert_timestamp = time.mktime(datetime.datetime.now().timetuple())

    def _hash(self, val):
        encoded_val = val.encode("utf-8")
        h = hashlib.md5(encoded_val)
        ret = base64.urlsafe_b64encode(h.digest()[:6])
        return bytes.decode(ret, "utf-8")


class DB:
    """

    DB

    Data Access Layer:

    - create Database and tables
    - execute SQL requests to database

    """

    def __init__(self, db_path: str = "pastebin.db") -> None:
        self._database = db_path
        self._conn = self._create_connection(db_path)
        self._create_pastebin_table()

    def __del__(self):
        if self._conn:
            self._conn.close()

    def insert_paste(self, paste: Paste) -> str:
        sql = """ INSERT INTO pastebin(id,paste,insert_timestamp,badge)
                    VALUES(?,?,?,?) """
        try:
            self._conn.cursor().execute(
                sql, (paste.id, paste.paste, paste.insert_timestamp, paste.badge)
            )
            self._conn.commit()
        except sqlite3.Error as e:
            logging.error(
                "unable to insert new paste in sqlite3 database", exc_info=True
            )

        return paste.id

    def _create_pastebin_table(self) -> None:
        sql_create_pastebin_table = """ CREATE TABLE IF NOT EXISTS pastebin (
                                            id text PRIMARY KEY,
                                            paste BLOB,
                                            insert_timestamp REAL,
                                            badge TEXT
                                        ); """

        try:
            c = self._conn.cursor()
            c.execute(sql_create_pastebin_table)
        except sqlite3.Error as e:
            logging.error("Error creating sqlite3 pastebin table", exc_info=True)

    def _create_connection(self, db_file) -> Connection:
        conn = None
        try:
            conn = sqlite3.connect(db_file)
            print(sqlite3.version)
        except sqlite3.Error as e:
            logging.error("Error creating sqlite3 database connection", exc_info=True)

        return conn


# very temporary: used to test the module locally
#
# if __name__ == "__main__":
#     db = DB(r"pastebin.db")
#     p = Paste(paste="dadabababa", badge="mon ami")
#     r = db.insert_paste(paste=p)
#     print(r)
