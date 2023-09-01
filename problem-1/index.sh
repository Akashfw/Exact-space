#!/bin/bash

# Step 1: Find the largest log file name
largest_log_file=$(find / -type f -name "*.log" 2>/dev/null | xargs du -h | sort -rh | head -n 1 | cut -f2)

# Step 2: Check if a file is found
if [ -n "$largest_log_file" ]; then
    echo "The largest log file is: $largest_log_file"
    
    # Step 3: Print the name of the largest log file
    tail -n 100 "$largest_log_file" > truncated_log_file.log
    
    # Step 4: Truncate it to its last 100 lines
    echo "The last 100 lines of the largest log file have been saved to truncated_log_file.log"
else
    echo "No log files with the .log extension were found."
fi
