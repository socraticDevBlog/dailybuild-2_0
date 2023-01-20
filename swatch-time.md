# dailybuild SIT (swatch Internet time)

status:

1.  basic proof of concept✔️ 2. luxemboye -> [https://luxemboye.github.io/clock.html](https://luxemboye.github.io/clock.html) 3. socraticDev -> [https://dailybuild.org/time.html](https://dailybuild.org/time.html)
2.  next step : add a conversion feature to fullfill this user story 🐱‍👓:

- as a remote/online event planner, I need to be able to display time in @beats. For example, if the event is at 13:30 Sydney, Australia, I need to easily convert this time in @beats.

## Calculation from UTC+1

The formula for calculating the current time in .beats from UTC+1 is:

`((UTC+1minutes * 60) + (UTC+1hours * 3600)) / 86.4`

> Instead of hours and minutes, the mean solar day is divided into 1000 parts called ".beats". Each .beat is equal to one decimal minute in the French Revolutionary decimal time system and lasts 1 minute and 26.4 seconds (86.4 seconds) in standard time. Times are notated as a 3-digit number out of 1000 after midnight. So, for example @248 would indicate a time 248 .beats after midnight representing ​248⁄1000 of a day, just over 5 hours and 57 minutes.

## existing projects

- [hangorazvan/watch](https://github.com/hangorazvan/swatch)
  - keeping things simple : basic JS to fetch info and MomentJS library for time-related functions
- [list of projects hosted on github.com](https://github.com/topics/swatch-internet-time)

## use cases

- actors spread around the world, sharing a common time for events happening live (ex.: a meeting, lauching a rocket, etc.)

## requirements

- time should be accurate (i.e. display should auto-refresh every beat - 1000 times per day)
- utc+1 date (yyyy-MM-dd) should be displayed alongside SIT

| date       | time |
| ---------- | ---- |
| 2021-01-01 | @123 |

## simplest process (web)

| server          | client browser                       | client machine         |
| --------------- | ------------------------------------ | ---------------------- |
|                 | <--requests page                     |                        |
| serves page --> |                                      |                        |
|                 | (if needed)js fetches client info -> |                        |
|                 |                                      | <-- gives informations |
|                 | updates display every beat           |                        |

### sources

[https://www.wikiwand.com/en/Swatch_Internet_Time](https://www.wikiwand.com/en/Swatch_Internet_Time)(last visit: 2020-12-27)
