import subprocess

def get_windows_host_ip():
    result = subprocess.run(["bash", "./get_win_host_ip.sh"], stdout=subprocess.PIPE)
    return result.stdout.decode("utf-8").strip()