import json
import os
import subprocess
dep_json = "deploy-cache.json"
distdir = "dist"
cached: list = json.load(open(dep_json))
to_upload = []

def is_public_file(fn: str):
    tails = ["jpg", "jpeg", "png", "ttf", "psd", "ico"]
    for tail in tails:
        if fn.endswith(f'.{tail}'):
            return True
    return False

for (dirn, dirns, filns) in os.walk(distdir):
    for f in filns:
        p = f'{dirn}/{f}'
        if is_public_file(p):
            if not p in cached:
                cached.append(p)
                to_upload.append(p)
                print(p, "\033[32m未缓存，上传\033[0m")
            else:
                print(p, "\033[31m已缓存，放弃上传\033[0m")
        else:
            to_upload.append(p)
            print(p, "\033[33m非可缓存文件，直接上传\033[0m")

if to_upload:
    print("运行命令:\n\t")
    for f in to_upload:
        cmd = ["scp", f, "root@123.56.18.197:/www/server/nginx/html/" + f[5:f.rfind("/")]]
        print(*cmd)
        subprocess.run(cmd)
else:
    print("\033[32m没有任务\033[0m")

json.dump(cached, open(dep_json, "w"))