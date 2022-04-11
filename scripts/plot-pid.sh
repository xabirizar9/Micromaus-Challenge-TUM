#Process log data into compatible format. plotdata is Just a copy/paste of your sample data
echo "# timestamp target input output err de se" >ploatdataout.txt

grep --color=never -e "0m" $1 | grep --color=never -e 'PID' | grep --color=never -e 'I (' | while read lvl stamp service target input kp ki kd err de se out t; do
    stamp="${stamp#(}"
    stamp="${stamp%%)}"
    printf '%d ' "$stamp"
    echo $target | (
        IFS="=" read -r key value
        printf '%f ' "$value"
    )
    echo $input | (
        IFS="=" read -r key value
        printf '%f ' "$value"
    )
    echo $out | (
        IFS="=" read -r key value
        printf '%s ' "$value"
    )
    echo $err | (
        IFS="=" read -r key value
        printf '%f ' "$value"
    )
    echo $de | (
        IFS="=" read -r key value
        printf '%f ' "$value"
    )
    echo $se | (
        IFS="=" read -r key value
        printf '%f' "$value"
    )
    printf "\n"
done >>ploatdataout.txt

gnuplot ./scripts/pid-plot-script.plt
