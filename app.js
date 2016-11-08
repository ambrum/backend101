function main (date, name, cb) {
    var message = "It's working time :(";

    if (date.getDate()%2 == 1 && date.getHours()%2 == 1) {
        message = "It's lunch time!"
    }

    cb(name + ' "' + message + '"');
}


main(new Date(06,20,3,21), 'homework result is', function(result){
    console.log(result);
})