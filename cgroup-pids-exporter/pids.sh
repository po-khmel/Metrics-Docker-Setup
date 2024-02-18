#!/bin/bash

shopt -s globstar
for cg in /sys/fs/cgroup/**/pids.current; do                       # fixed
    pids=$(cat "${cg}")
    if [ "$pids" !=  "0" ]; then
        echo node_pids_current\{cgroup=\""${cg}"\"\} "${pids}".0   # fixed
    fi
done
