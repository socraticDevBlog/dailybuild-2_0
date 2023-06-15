from db import DB, Paste
from typing import Any


class Service:
    """

    Service

    'business layer' of the Pastebin API

    Will interact with a requester (API routes) and the Database

    unit test coverage should be around 100%

    """

    def __init__(self, db: DB = None):
        self._db = db if db is not None else DB()

    def save(self, content: Any, badge: str = "") -> str:
        p = Paste(badge=badge, paste=content)
        return self._db.insert_paste(paste=p)

    def retrieve_by_id(self, id: str):
        ...
