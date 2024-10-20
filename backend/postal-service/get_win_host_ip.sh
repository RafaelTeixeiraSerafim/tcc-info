WIN_HOST_IP=$(grep -m 1 nameserver /etc/resolv.conf | awk '{print $2}')
echo $WIN_HOST_IP