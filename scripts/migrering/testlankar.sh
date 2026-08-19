SP="$1"
: > "$SP/lankstatus.txt"
while read -r u; do
  [ -z "$u" ] && continue
  hu=$(printf '%s' "$u" | sed 's|^http://|https://|')
  c=$(curl -sIL -m 15 -o /dev/null -w '%{http_code}' "$hu" 2>/dev/null)
  if [ "$c" = "000" ] || [ -z "$c" ]; then
    c2=$(curl -sIL -m 15 -o /dev/null -w '%{http_code}' "$u" 2>/dev/null)
    echo "$c2	$u	$u" >> "$SP/lankstatus.txt"
  else
    echo "$c	$hu	$u" >> "$SP/lankstatus.txt"
  fi
done < "$SP/lankar.txt"
echo KLAR
