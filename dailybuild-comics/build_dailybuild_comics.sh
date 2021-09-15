#!/usr/bin/env bash

INPUTFILE="comics.json"
FORMATFILE="comic_format.html"
TEMPLATEFILE="template.html"
OUTPUT="../dailybuild-comic.html"

pushd `dirname $0` > /dev/null

INPUT=`cat $INPUTFILE`
FORMAT=`cat $FORMATFILE`
TEMPLATE=`cat $TEMPLATEFILE`

# -m 1 for first match only -n for line numbers
LINE=`echo "$TEMPLATE" | grep -m 1 -n '\-COMICS-' | cut -f1 -d:`

# head -n (line-1)
# Allows to only get before "-COMICS-"
head \
	-n `expr $LINE - 1` \
	$TEMPLATEFILE > $OUTPUT

AMOUNT=`echo "$INPUT" | jq '. | length'`

echo "Building page of $AMOUNT comics"

# for i in {0..$AMOUNT-1}
#for i in `seq 0 $(expr $AMOUNT - 1)`
for ((i = 0; i < $AMOUNT; i++ ))
do
  ARRAY=`echo "$INPUT" | jq -c .["$i"]`
  URL=`echo "$ARRAY" | jq -r .url`
  TITLE=`echo "$ARRAY" | jq -r .title`

	# Replace all instances of: URL with $URL, and TITLE with $TITLE
	echo "$FORMAT" | awk \
		-v srch1="URL" -v repl1="$URL" \
		-v srch2="TITLE" -v repl2="$TITLE" \
		'{ gsub(srch1,repl1,$0); gsub(srch2,repl2,$0); print $0 }' \
			>> $OUTPUT
done

# Allows to only get after "-COMICS-"
tail \
	-n +`expr $LINE + 1` \
	$TEMPLATEFILE >> $OUTPUT

echo "Finished building!"

popd > /dev/null
