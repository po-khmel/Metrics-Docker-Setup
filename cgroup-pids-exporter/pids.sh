#!/bin/bash

shopt -s globstar
for cg in /sys/fs/cgroup/pids/**/pids.current; do
    pids=`cat ${cg}`
    if [ "$pids" !=  "0" ]; then
        echo "node_pids_current{cgroup=\"${cg}\"} `cat ${cg}`.0"
    fi
done
