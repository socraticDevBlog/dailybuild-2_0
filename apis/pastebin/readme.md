# dailybuild pastebin

a simple rest API that lets users paste text and retrieve it later

## Authors

- [@SocraticDevBlog](https://github.com/socraticDevBlog/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/socraticDevBlog/dailybuild-2_0
```

Go to the project directory

```bash
  cd dailybuild-2_0/apis/pastebin
```

Install dependencies

```bash
  python3 -m venv env
  source env/bin/activate
  pip install -r requirements.txt
```

Start the server

```bash
uvicorn main:app --reload
```

Query default endpoint and expect `{"Hello":"World"}%`

```bash
curl localhost:8000
```

## Tech Stack

**Server:** Python, FastApi


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, please reach out to us at IRC Rizon network:
#dailybuild

-------------
everything below this line is templated stuff

## API Reference (tbd)

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.



## FAQ

#### Question 1

Answer 1

#### Question 2

Answer 2

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`