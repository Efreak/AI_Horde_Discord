# AI_Horde_Discord

A basic Discord bot to generate images using the AI Horde API.

# Differences between this bot and upstream:

- reload styles when /about is used. this is a bad hack imo, so I haven't pr'd it to upstream (*some* of the features below have been refused, others haven't been pr'd as I don't think they're likely)
  - this really deserves its own command, but needs some way to either rate limit or require certain permissions to use it, or make it only available in specific channel.
- supports setting a second styles and categories file that overrides or adds entries from the main styles.
  - use this if you like Horde styles and want to be kept up to date on them, but want different aspect ratios or other parameters on some of them.
- supports setting specific Lora version (prefix modelversionid with a *v*)
- supports setting lora weights (add a colon before model weight, another colon before clip weight)
- supports multiple loras (separate multiple loras with commas)
  - this breaks autocomplete. make sure your formatting is correct!
  - this also works with embeddings
- the lora autocomplete includes the modelid, so you can use it directly if you want to use weights
  - this also works with embeddings
- style (and model) names are trimmed so if you put in a name on mobile and it automatically adds a space after the colon, autocomplete will still work.
  - the `style:` prefix that the bot adds is also trimmed, both for autocomplete and for input, so if you copy a command before sending it'll still work when you paste it
- interrogate accepts a URL so you don't have to download and reupload a file that you saw in discord (interrogate currently doesn't work at all as of this writing, so not much point in this)
- doesn't require a reward. make a party in a server and pay for generations with 0 reward without sending people messages regarding horde accounts or requiring them to trust the bot with their API key.

### TODO:

- add a Lora search command. inspired by ketsuna.
- consider adding trained words to the lora autocomplete.
- trim requested model name at the first `|` character for copied commands
- add a dedicated i2i command because the number of parameters has been fully used up and I'd like to set the image URL
- add support for Cascade image input
- add support for the new api-based styles feature
- figure out a way to combine some subcommands, discord only allows 25 subcommands and those have all been used up.
  - idea: remove hiresfix and add true (default) and false (off) to the denoising parameter.
  - combine tis with loras and require specific prefix for tis (like modelversionid)
  - remove seed variation and share result
  - merge clip skip into cfg field (it's probably only being set when you set cfg anyways)
  - merge karras into sampler
  - these will free up up to 5 subcommands for use with other features
  - esrganmerge gfpgan and esrgan into a new post processing parameter, this will also allow choosing all the available combinations of upscaler and face fixers.
- add a command that takes a json object, validates it, and passes it to generate/async endpoint.
- add seed to generation results
- add a command for viewing styles, it would be nice to get the parameters from inside discord
- text generation? this will have to be left to someone else, I don't know enough about it. would be very nice to have though.
- rate limiting generation. this is a fantasy, I doubt it'll happen.
- add support for managing shared keys (it should be pretty easy)
- add support for putting workers in and out of maintenance (also easy)
- add support for worker messages maybe?
- provide a more useful error message when the API key is wrong


**DISCLAIMER:** THIS REPOSITORY IS IN NO WAY ASSOCIATED TO THE CREATORS OF AI HORDE  
OFFERING THIS CODE IN FORM OF A PUBLIC DISCORD BOT WHICH CAN BE INVITED BY EVERYBODY IS NOT SUPPORTED.  
THE SCALE OF A BOT USING THIS CODE IS 1 SERVER, EVERYTHING ABOVE IS NOT SUPPORTED.  

**DISCLAIMER:** THIS FORK IS UNSUPPORTED. I USE IT PERSONALLY AND CHANGE IT HOWEVER I LIKE. IT'S NOT GUARANTEED TO WORK.

## Features

View [the changelog](https://github.com/ZeldaFan0225/AI_Horde_Discord/blob/main/changelog.md) to see what has been added

This package includes the code for a discord bot which interacts with the ai horde api.
The bot has the following features:

- /generate command with all options the api supports at the time of creating this file
- /login, /logout and /updatetoken for users to add and manage their account which they can create at https://aihorde.net/register
- /userinfo (Userinfo context command) which shows your ai horde user information and the user information of anybody else who is logged in
- /terms which shows how the bot currently handles the api token and further information
- /models which shows all currently available models
- /worker which lets you see information on an active worker
- /team which lets you see information on a team
- /news which shows latest news about the horde
- /transferkudos (Transfer Kudos context command) to send somebody kudos
- /interrogate to interrogate any image
- /party to start a generation party with a given style
- "Remix" to edit another discord users avatar 
- "Caption" to caption anozher discord users avatar
- advanced configuration file which lets you change how the bot behaves and what actions the user can use (for limits refer to https://aihorde.net/api)
- logging prompts, user id and generation id to track generation of malicious, nsfw or illegal content
- and even more...

## Version Requirements

- NodeJS >= 18.0.0

Optional:  
- PostgreSQL >= 14.6

## How to set up

### A detailed Linux setup can be found [here](https://github.com/ZeldaFan0225/AI_Horde_Discord/blob/main/DB_SETUP.md)

1) download the code from this repository  
2) get the token of your discord bot (https://discord.com/developers/docs/reference#authentication)  
3) Install the node modules using `npm i` (make sure the dev dependencies are also installed for typescript to work)  
4) remove the `template.` from the `template.config.json` file  
  
If you want to have extra functionality do the following steps:  

5) set up a postgres database  
6) fill out the `template.env` and rename it to `.env`  
  
If you just want to generate images with no token or the default token in the config.json file do the following steps:  

5) modify the config file and set `use_database` to false  
6) fill out the `template.env` and rename it to `.env` (you can leave the keys prefixed with `DB_` empty)  
  
7) Run `npm run generate-key` and copy the generated encryption key in your `.env` (If you disabled token encryption you can leave it blank)
8) modify the [config.json](https://github.com/ZeldaFan0225/AI_Horde_Discord/blob/main/template.config.json) file (from step 4) to fit your needs (you can read about what which property does in [config.md](https://github.com/ZeldaFan0225/AI_Horde_Discord/blob/main/config.md))  
9) compile the code and start the process (this can be done by using `npm run deploy`)  
  
Now if everything is set up it should start and give an output in the console.  


## Encryption Key
When changing your encryption key after deployment the tokens won't be decrypted properly.  
Avoid changing the encryption key after initial setup.
Disabling encryption at any point will make commands for users who saved their tokens in an encrypted form not work any more.

## How to update

1) Pull the code from this repository
2) Update your config. Reading through the [changelog](https://github.com/ZeldaFan0225/AI_Horde_Discord/blob/main/changelog.md) might help.
