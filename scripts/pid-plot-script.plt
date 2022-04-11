set term png size 2000, 2000
set output "plotdata.png"
set title "PID Error response"
set xlabel "Time (ticks)"
set ylabel "Output (PWM)"
plot "ploatdataout.txt" using 1:2 title "Target" with lines, \
    "ploatdataout.txt" using 1:5 title "Error" with lines, \
    "ploatdataout.txt" using 1:6 title "Derivative" with lines, \
    "ploatdataout.txt" using 1:7 title "Error Sum" with lines