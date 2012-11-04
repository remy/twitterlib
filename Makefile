VERSION = $(shell node -e 'fs=require("fs"); v=JSON.parse(fs.readFileSync("./package.json")).version;console.log(v)')
DATE = $(shell git log -1 --pretty=format:%ad)

all:
	@@echo "Building" ${VERSION}
	@@cat twitterlib.js | sed 's/@version.*/@version '"${VERSION}"' \/ '"${DATE}"'/' | sed "s/'.*', \/\/@version/'"${VERSION}"', \/\/@version/" > twitterlib.tmp.js	
	@@uglifyjs -o twitterlib.min.js	twitterlib.tmp.js
	@@mv twitterlib.tmp.js twitterlib.js
	@@echo "Done"
