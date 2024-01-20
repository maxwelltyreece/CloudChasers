#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir//bin/sh" ]; then
  exec "$basedir//bin/sh"  "$basedir/../react-native-vector-icons/bin/fa-upgrade.sh" "$@"
else 
  exec /bin/sh  "$basedir/../react-native-vector-icons/bin/fa-upgrade.sh" "$@"
fi
