# GitHub Action (deploy to server)
File: `.github/workflows/deploy-site.yml`

The following sections explain what has to be setup, how it has to be done, and what it corresponds to.

## destination
The destination is pretty clear: `user@hostname`
The port can (for the moment) be specified using a separate `-p` flag. (see ssh manual section 1)

## host key (public key)
The host key can be gotten from your `.ssh/known_hosts` file, or by using ssh-keyscan. (Note that the usual warning about verifying the key applies here, if you wanna be sure you are being MiTM-ed)
In our case, we're using an ed25519 key for the runner and host, so we only have a single line.

Note that the `SSH_DEPLOY_HOST_KEY` hostname can also be hashed. (see sshd manual section 8 for example)

This only has to be added into the GitHub secrets

## runner key (private key)
The runner key is generated using `ssh-keygen`.
Preferably a ed25519 key (-t flag).

### Setting up
As just mentioned, you want to generate your ssh key.
Once it has been generated, the content of your public key (`.pub` file) can be added into the `authorized_keys` file, while the private key is set as the secret.

Depending on your setup, you might want to change the `.ssh/authorized_keys` path.
In our case, as we use the home directory as a working directory and we delete all of the files in it, the default path of `.ssh/authorized_keys` is not appropriate.
As such, you'd want to edit your `sshd` config. For example:

```
Match User ghrunner
        AuthorizedKeysFile      /etc/ssh/keys/ghrunner
```

Note that you either wanna put this at the end of your sshd config file (as you'd otherwise apply all of the other settings listed afterwards only to the User), or in a separate file, making use of `Include`.
The `authorized_keys` file itself isn't special in any way: it is simply a file with authorized public keys on every line.

## Secrets
|variable name          |description |example  |
|-----------------------|------------|---------|
| SSH_DEPLOY_DESTINATION| SSH destination (user + IP/resolvable hostname/FQDN) | user@example.org |
| SSH_DEPLOY_HOST_KEY   | SSH known host [1] (public key) | example.org ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB55XT3lUwyz+F9dnZswfZBpOeEfGkqTUqBrAcTbOc7r |
| SSH_DEPLOY_RUNNER_KEY | SSH runner private key | ----BEGIN OPENSSH PRIVATE KEY-----<br>b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW<br>QyNTUxOQAAACAeeV095VMMs/hfXZ2bMH2QaTnhHxpKk1KgawHE2znO6wAAAJibgVNkm4FT<br>ZAAAAAtzc2gtZWQyNTUxOQAAACAeeV095VMMs/hfXZ2bMH2QaTnhHxpKk1KgawHE2znO6w<br>AAAED8h2Zgjr8DNuCIR+9Rwi6kQxiKS9JvPbCVCFqhSchDGR55XT3lUwyz+F9dnZswfZBp<br>OeEfGkqTUqBrAcTbOc7rAAAAEmx1eGVtYm95ZUBkYXJrc25vdwECAw==<br>-----END OPENSSH PRIVATE KEY----- |

While the destination here is only a single line, the `HOST_KEY` and `RUNNER_KEY` can be multi-line. (multiple key types, multi-line key)

[1]: https://man.netbsd.org/sshd.8#SSH_KNOWN_HOSTS%20FILE%20FORMAT
