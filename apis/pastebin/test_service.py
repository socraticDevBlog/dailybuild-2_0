import pytest
from service import Service
from db import Paste

PASTE_CONTENT = "a sample paste"
HASHED_CONTENT_FIRST_SIX_CHARS = "b054cd"


class Mock_db:
    def insert_paste(self, paste: Paste) -> str:
        return HASHED_CONTENT_FIRST_SIX_CHARS


def test_simple_insert():
    svc = Service(db=Mock_db())

    r = svc.save(content=PASTE_CONTENT)
    assert r == HASHED_CONTENT_FIRST_SIX_CHARS
