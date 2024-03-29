const username_input = document.getElementById("username");
const pass_input = document.getElementById("password");
const cpass_input = document.getElementById("cpassword");

username_input?.addEventListener("keyup", async (e) => {
    e.preventDefault();

    // Get user
    const response = await fetch('/user?username=' + username_input.value, {
        method: 'GET'
    });

    if (response.status === 200) {
        // User Exists: Add error message
        document.getElementById('usercheck').style.display = "flex";
        document.getElementById('usercheck').innerText = 'Username already exists.';
        document.getElementById('usercheck').style.color = "red";

    } else {
        // Username is free
        document.getElementById('usercheck').innerText = '';
        document.getElementById('usercheck').style.display = "none";
    }
});

pass_input?.addEventListener("keyup", async (e) => {
    e.preventDefault();
    if (pass_input.value.length > 15) {
        document.getElementById('passcheck').style.display = "flex";
        document.getElementById('passcheck').innerText = 'Password length must not exceed 15 characters.';
        document.getElementById('passcheck').style.color = "red";
    } else if (pass_input.value.length < 4) {
        document.getElementById('passcheck').style.display = "flex";
        document.getElementById('passcheck').innerText = 'Password length must be at least 4 characters.';
        document.getElementById('passcheck').style.color = "red";
    } else {
        document.getElementById('passcheck').innerText = '';
        document.getElementById('passcheck').style.display = "none";
    }
});

cpass_input?.addEventListener("keyup", async (e) => {
    e.preventDefault();
    if (pass_input.value !== cpass_input.value) {
        document.getElementById('cpasscheck').style.display = "flex";
        document.getElementById('cpasscheck').innerText = 'Password does not match.';
        document.getElementById('cpasscheck').style.color = "red";

    } else {
        document.getElementById('cpasscheck').innerText = '';
        document.getElementById('cpasscheck').style.display = "none";
    }
});

$(document).ready(function() {
    $(".register-button").click(async function(e){
        e.preventDefault();
        console.log("register button pressed");
        let uname = $('#username').val();
        let pass = $('#password').val();
        let cpass = $('#cpassword').val();
    
        let isValid = true;
        if (uname === '' || pass === ''|| cpass === '') {
            isValid = false;
        } else if ($('#passcheck').is(":visible") || $('#cpasscheck').is(":visible") || $('#usercheck').is(":visible")) {
            isValid = false;
        }
    
        if(!isValid){
            document.getElementById("message").innerHTML = "Register Failed.";
        } else {
            const data = {
            username: uname,
            password: pass,
            bio: "",
            pfp: {
                data: "/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIAOEA4QMBIgACEQEDEQH/xAAdAAEAAwACAwEAAAAAAAAAAAAABwgJBQYBAgQD/9oACAEBAAAAAL/APEJ1jguM+r+nZZGm+zU/+QADxU6g3RrKz/KvbP16tGEC1k5W990PcAHQstI7v5cP7QHpVLPr7NTpbAEBZP2n0l5EAHpn3RvUC1YCAsk9FrpgACsuV+ndrwdAxh0LukA6v+HbvIFasp9hpnHjHeUdOAeKbUy7z9Ed2tvX7AoVTvbL9ypmc23v3gzb+jRb9nrR2B9W/IeMYLXXyeMVbt3QBXyn+oYM/u+XFBXDLXdP9oSyI3Z+sGWd/wCTQcdkdsEDxiPobazPaOtTgMb9kAGNmyYGeXQdS8grV3SAyR1T5sDGzZMCuOZ+32G2p89AUs+S7wKwQXomB0PD/ZnHHaKTwPXHbRWdhF+WuvfPgfLgXNMQbUyWA4DLXstj/wBoFiTUSQAHz4EyZwWrk5geKZ01lGVP2jaGbXXq9wOnYZa7Z/XHuEDjMopyvp9Q9aXVI1g7UCvmW+5ecvXNPQZI3Ts2AhnNbYX6goJD+rdfsqd1PcU9jjQkAU9j3QQMXLwXD9cP9ErYDGrYf7gB4xk2W/Yg/IfdDmFLaObX/s6lmVrEADOG104PGQE16KnrixaHQhBtW9FgAUt562inOem2/NCI8cNUbNfl1ftoAOD/AH5WGce9WrIAqrl/qrZUAAQvkbfO84CqOYN+L5+QAeKdZt6AXqAEMZW8zohY/wAgEHZ4RdqDZAAHzUWox2C1k/yp2326zFsEVWjq6d/OZAAPlq9WCC+g+p3Ob7NWq5gAAAhzM3gtKrEAAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8QAMhAAAQQDAAEDAwMCBQUBAAAABQIDBAYBBwgRACAwEBIVExQXFjEhMjRAUiQlMzVTVP/aAAgBAQABDAD4FKShKlrVjCbl0lqGkZdYkWRBWfaO4y7uXmqbSYsZJvqHdhtbmf6wzAZnbJ2ISyvJC+WGR6lESE3OVTJ8h9UabMhqwuJLeYVD2DfR3j8fdz8b0G6V3YEy1hm8ypTda7gtUXKGrbTxpFundV6gtuWmJJp0DMjSY0thqVEkNPsfO442y24684lDezevaVUv1xVHZTZCt/3RsfZTjmLNYn8wQVcP2eakdXAs4nLqnHe1z36LxvI4BHA8PU2MhrNluJee9A5V0aOwlbtSclrb0PpuMn7Ea5C59PaJ044jOF64B4xP5b0cQ8rzSsRlneI9fTcPrAWU0MetPF2yhGHXq2TFnmbPSrbTJX7O1VyeLdpOzr3ruViTUbJLgo1j2aCL5jitlDsCJcAgPKQopMXNYmQvk2RtSmanD4KWif4kba6CvO13nokuRkXXaVQLfsMp+IqAR+fI1vxfXBSWCGyCWTEwKAAVeC2MroaENh/ASGji8J8cWgRpsLYvHdDs2H51LfXWyexNS3rV03EW2BltR9Y7kvGqZ+H62SysdqHelP27Bxga9+wPfFvTfoTUI/I+BhkjbrRarBdDcyw2co9PJaS5QNXPESzX/EgQArdZr9PExwtbExxo35Cg0YYgyRhiBHmwd1chPQES7Nqdt2RHgTy9dLMTx0mSPKc+dLxNhoi1K6OsxLb8G/t6DtRBcQR2WpVuIkTFlMSSRKTIIFefuXotcRAu2x4aHzn+w35zYJ2WzKs9YQzAuE+AXrZeRAIR5I8rzV0Oi/xWKTcZaEWz3bU2MI1VTp9pLeHXrVaDV0sBSz2GXmSS5e5+RXIsPY93gf8AfPfnPj/HPolsPXoR3EczeQEF0fs3WhN7EWBsCtyX0LQ4hLja0qR7+j9BxtnCXLHXIzTVxjSClfLMyozkiAV0FuOJt2opkysttWT2OONstuOvOJQ30Ftp7a95kS4j2f6d5S0oi4mf5Bs8TyA9ylYThSlKxhO1+vgFZdkhNcR2DhOXZN3bwIvw0yzx/wBCeQd0EmkuyhowZ6I8dblgsrdjRw09S2t36NmNuK/qGtY1V2Y1KfjBtqQkR8wZsIjCjEB0tmVD93XeksZQ9tmsRPC9V7FKauuoq2DfK2wJcbYQww8HlJkD/r17szNSpTNIFv4SVoFKKbDt4SoCP8JFZrYengBNbBx8MDvd050NIsM0jrekzctAdF8pKsEaDb9moeYFigwiujo4kENij4H0mRIk+M/CnxWZMXd/I8CWxLs+qI+I0zn7fZTUxnFYs65DlSZeZkstSI7qHWfbLhxZ8WTBmx234u79YyNVX4nX8YWoVxds/K2yWqysj6qUlCVLWrGE7ovzmytj2KzYcyqBxfrdIquE9kEWP+t93UWznNea6fhC5WWTvJ2nY97sj90sMbDoD3dh6djw/G2K9Fw2jjbZzthrM/XhaVlc/wB3VuuEXjW0k3BYwsvTrQQpVpA2sVnxLCGoFhCCrAMd/Ug+ukrj/RGoLLIjv/ZOrgKbZz4Wujk+ZdfBj6wBDV8a39kL3dkWdZnbGAKXs5j6SqjVH1VTAaGvsk+62V2FbqyerBDGP2vPpuZRd5VaPLzljPuWhDqFtuIStG2qVnXuxbVU0pziNxtdMn9bSqxJf8y/Xclny6XpNNZez446qmDu1snH2vMb39FrU9u+/wCXVekIS2hLaMeE+874idFF8xs/B3FVMMGqbdWGc+ONrRkLtdYJ17OGPXUJtZvdlw8ufezxCDRDplxsuWs4e9/WAR0Pu2yPrT4ZolgatdLqlkZz5T7pD7EOO/KkuJbY16h7Ye/a/MQ3nHwddgUGNMFZ2W8rd1SbXXNl0Qyh37MetkzsktiXwhlf3euVIGIGjaitScJX7+1aA6VrgPYMBjy7xhs+PLDzdWk38Ime7rLZsal0B+pQX8fm+KKA5MOntjzmPEX37eGfk9U7Fh/Z9y0qUhSVoVlKv5ba/wCbXojKzNIT5is+VaHQiNpzXTafgLCh5wYQDFYqJMDZ2v7Zz9sSI6MnSWmtG9A17bQxmBNWyOt3s2zuWqahCLml3cSS8ONfujdn5w67+4LUqoh6BVQ1TCNZTC99kZTJrp+Or/L6/k+T/wAsepsZUOZLiLx4Vol5C9Oa5cx/b4LvRazsUBKrdrHIlwtq843/AFRNePBcPlQFD7F2HWWWIFohxrNCF9r6wloTgoFPwHZ/aOp4SPEEbYJzl47UuRhp6FSQcUCzQtObQ3iXcPPZk4g6z1VU9Sgchq1F8yfgsLiWQBx5f+X1/HZH/wCKvWwYf46+3eB48euW5/5DR1LUvPlz3vvsRWXpMl5tljaHYtcry5QfXEJByeRtu6t4EnYH7s0dzWuM9qF0NPnJIoG1A4Vj/wByWylr9TeFYC8JyO2Q+36sXFOxx2Fu142IMIz/ADbokgjOcnq0vWPaUZ9bAvaYzEb0KKCjA6KXDkI82B79sEMitYbDnoV4c9fw8r/8frpUNkJuy8s/pZQ3xGdxN1/ZgC38Le91lsoOoAyNhsJBuEK3Lv227mJ4ACWJMKt6f45/XajH9srWhIUECq45kRXREQbB9hGDAKQpA4pBjzIe2+PApdqWb1ctAsnr3aGxOfrTOFuxH0M0DYdZ2VWY1nrEv9WP7urTeAelLGzh7DT+uQ2bDf6UDw1lxPruCtftLVTrY0jOG+L7VgRsonW3nkoZ9rzzMdl1991DTPQO5iO47awIAfuFVrnbneBrYdFtNqiNSLn8G79HAdvA1r+xqFaNb3y3c+7FkpIwZLOARsTYQouwBpSJI/29yWrGXKRSWXceeQa1k7uKCSWhWWPXVdOzbdQGpDDX3zKXZpVMttctUP7sujiMMuNHlhz6XoXs7H2i5XKxC14Ik/YR481E3Mee2uei4U18XXeoW7JXM7JCRfBjjDaS2Jk/VZeT5Y9u87unYO0bVYI7/wCrA4qpuRdFOXGQjw/6kx2JUZ+LKaS6xs6kytd3uyVGRheUcd7GxZaI/Sp7/kn7NlnJ+490lVinMP8Aqr10dUq4ErIpH2wvifZZksvR5DSXGbYNI6P3PMaGZVhYwrDNihhcc7hyF9ek9i413rEquI/9hcCEIWQ2Jr4ln9WfVK/Bp1ZA1UZ/pfp2brLJcEO2UKjeZepdiTdXXoNbIuFuRxpOAXFwCwqUiRC+m0Tzta1zeTjCvskci19s5ucZKdx5R8ncNebh3Cm2Zv8Avy+dcO6Tpy314U/9FKwnClKVjCejNq/yjf5Tw97Kq/xlrTM4wQ2eVj5/a/UgPhFoE0WSjNyYW5NYz9U3glW38OrHchbrRAeb1RZpfiP9OoHHImib440vwvhmKhdovc3KPK/k7jiIzTaRM8f48TPuO6qNsrz5x9Otd1IrQZ3Wdbl4wbo1NMX+1BqmDZyuXUasJo1YC1IE1+nA9m89QQNt050YjDLJ6fALV0vJHz2H4JTmzfjOyxKKxZ5SEXD0YECTYqcGMwGZg+ka2o+tIk2FSgLQ5HyXCm1e9BHK9bQ7REdV6pW6KEi16rCmh431vfdQvUNaUtrLUmzFCZayF5hUpKenFOZ9I41hXMnj8VGLb7ulefEbFiO3OpRsItsCeXrZeOQgSJA8roPo8Rs2LGrdjcZgXH/Ybp3vWdQi8s5U3Pstttp+8H59lss9csjy7zqsbmBs69wc4m/B0PzVG2AiVcaSw1GtkmMWr5VyNKZlDiukuvEZTErG2XvC4cqLPix50GUzJi/IpWE4UpSsYTuvrYNWkS65rN5gqbJlC9kLSihWZIIFOd+YMjFQr3s2Bj998W4tBVHbsTMqSn8bZNi6ruurin422ClNN6x3fftVSU4r5PL4rW3VmtLqliEZkf00YQtDqEONrStHw7F6S1jrvD0RZXBkvtXoy/7R/WHvSvxFfptGtV/MNA6mGfny9I8z1zWGIp89loxbfkNAw58XKDnhkUhA2fxc2vMgrqslhr1aKdaaUQyKtYGYMl0rbWxde5Smp2qZDjVTuE1HwyxdabFmYAdeaYMIbzOKTwzo3cGqCf2YgbErqlR7FXXkeY58a7hR8Awj73jY9tM/a+sBHlE/YNdZWb6t0mCw/hmxyCr9q7kXnDrNKpGMervvPaOwUvx7BapOIAQCbshBkTXxMsjP1nxkYnZjFdnkfxsWrVCsUYS0CqYWMNgfOaBgz0B0WdEQyMK6ca61P5ek1iXNrku0cb7WC5ecArGH2Deqdl1xbiTNEOR0qSpClIWnKVfUNrm/2HLWAdKNzU1nkLcR3KFkoMAExTuKaMKy1IuRycdfr1VrNPg/jKoBgi4v+123/wCJfrZ/+pX611/7Fn1p7+8P5v/EAEwQAAIBAgMDBgoECggHAQAAAAECAwQRAAUxEiFREyAwQWJxBhAUIjJCYYGholJygpEVI0BDU3ODkrPBJDNjZJOxwsMHNESjpLLS4f/aAAgBAQANPwDoALkk2AAxHcGkygCre41BcERKe9saJUZrO05PfFDsYfSGgpoYAvc9i+G1EuZ1Lj7i+DqZZWc/MTgaGKRkPwwNOQzKoj/9XwmsdfFDVh+9pVL4uAZaCV6OQL3PywY4b8znCCBP8ZS0WJFDJLEwdGU6EEXBH5AilndiAqqBckk6AYW6moR9jLom/WazfYwxuMupbwUS/sk9Pve5wbfiaOB5nAJtchAbD2nB1FXPy9QF4iODbGAbsKKOGii+cTnA9apr6pvgrquO3AHPz47FMExxpq6qi+USbOH9ATclWQJ7rRvgDdGHNHUt9ibzPnwSQnlUDIklv0b+i49qnBbakpg3KUsp7cL3QnBsgzKkDyUTnjIm94sVMYkgqKeRZYZEOjI63BB6WUN5HQw2erqmXqjThxc2AxcGPKKRzyRsbgzvYGZsDZMzoNmGBW0aaRrKgxqaCjd4KJPYz7pJMJ6MFHCkMYPEhALses9DMpWanqolmikXgyOCCMG7CJQZ6Bz7Yybx/YxI+xT18B5WjnPYl49k2bDybdVldRd6OfvX1H7a4hiD1eTzuDMnF4ju5WLtDo6mK9LQk3jpwdJqm2icF1fFSbvNKdB1IiiwRB1KNwwbSQUVtitrU/2YjiAfi6eBbC/WzHVnPWxuT0tTGY5qeojWWKRT1MrXBwLyTZC5LzJxNI7b3+ocUM+1HLGWinhlQ29hBGhGFGzDOAI4MyHY6kn4p0OYQk0NLqKePTyqbscB65xmFRtyyveSaaaQ/EnQAY3TUOVSC8VDwknGjz8Bon5CifUgzEDRJ+EvCTGX1GzJG4MU0E0Z+8Eag4poj5NUPYDM4Yx/HTnj8TQUW1stVVbjzI+7rc9QxXzGWZzoOpUQdSIAAo6hidBLlVDMP+RibSeQdU7/ACdD1RVOZU8Tn7LPg6RRZpTO57lD4YXVlNwRxBHQUEN49EGYwp+Yk7f6NsZdVB0YXinp6iB796ujDGW7EGa0y6FvVqI+xLzUUs7sQFVQLkknQDGVl6TKI7EXi9ec9qYjGUTjyKCQeZXVqf5xQ88C5J3AAYS6vmcpvl0R7GwQZ8MRt0VErrQwgkkFoorRJ3tj6FZXoW/8cS4GkdLXhXPvnEQxyu4gsaGZ/mglw5CLnNEhEXfUQ/zTFTEk0FRA6yRSxuLq6MtwykaEc+6Ln1NEPctZ/KXETcjXU/VU0chHKxfzXgwGMwpYqqnlX1o5BtDuPEczwkV0n2dYsuTdJ/jehivnCPMV2lghXzpJmHBFBOMuplp4E67LqzHrdzvY9Z59K702aVsRsa+VDZ4UP6AfPiZBLSZMCYp6hDpJUOLGNOCDEAtHT0sSxRr3KoAufHOhSWGdBJHIh1Vla4IOIw8tRkWsU/tpSfQfsYqKgx1EDgmTLZibGaNf4iYlRZI5I2DI6MLhlI3EEaHnVELwzQyKGSSOQbLIwOoINjif+mZVMfXpJSbKeLRm6NiISZhk+3w1ngH8QeMC5JNgAMGc0uXDhRQeZH3bfpnGcFqOgJ1SihezuP1sg5/hCXoKNka0kUNvx86/UU2BGjMMZBOghhcXSqr/AEwjcUiFnbnzTRwZ5DHptvujq+9zZHxkCiegLm7vl0hsU7oH5/g1t5hARq9L/wBTH9w28ZZWR1KLewkCnz4z2XW6nGY0cNZTvoTFMgde42PizVFyikINjt1dw5X2rEGOMzroKOHcSA8zhATbqF7nGWUUFHTqddiFAgJ4sbbzz8hyymp9jqE9SPKXb3q6Yagjraz6XlNWOWkB+qW2efmlDNSObXK8qpAce1TvGJsxkyOti4mqvAEPdLY891KsrC4IO4gg4o6wtRk3N6SYCWHedSEYA48HK4xKCbnySrvLF822PFTUs+a1EfEztyMX3CN8eD+XT1YbqFRP+IjB9zMeg/CMaXPBYUXCgKBwA6CL/iLOY7ezMugrKWbLKp+oPTnlYvewdsZ/llRTBOo1FOPKEPuVH8VAaagh7IghXbH75OMwzeOiBPXHRQhx8Z+gzSnoq+D6phELfPGcZllVJVEalXkjBdT7Va4PPhjaWR20VEFyT7AMZr4XfhaVDqIhUGsl+QHoMmr6Kvit7X8mb4TYp88ouVb+xeUJKPehPiqfCHM5QfY9S5GKuSvqX+1VOo6DJnNFX8fJKk+Y/ckmKFpq7Kb6SU0p25oh7Ucl+f4TRPShBrHQaTyN9cHYGMuhOW0DMNaqcAzOPqJ0D+DuYui9uOBpFwpBBBsQRj3YnqJZSfa7FsHJKeT3yef0FdTyU1TC/oyRSrsspwk5rcgzZNZY0OjdRkS9pUxBH/S8vLWSe2s1LfVOK6pzZoz+D8picCepfi36OLi5xmT7c0tiKXL6KM/JDEDjL4BGpe3KTSHe8slvXdiWPQS5dVRn7URHjgmkiI9qNbAyOmT3oLdDKduM+jLBMAQs0L6pIuKaXyiDNKEEVFII/PDVCJviKfTGIxYSTuaet98yghvemOu0EM0f3pJjsUsUa+8yS4e6+Vzt5ZV96XAjTFVNt1nhBmpco9jstsFt87i1gFxOEauzCaxqauRdC56lHqINw6FMvqXPcIyfHTZ/mUFuHJ1DrinFbTN+yqpAvQRI0kkkjBURFFyzE7gAMISj5jPdKCNh9ACzz4Yi9BQRstHEpO4tFCBGo7b4bWOec1FQPsQBkx9CnysJ8zzHH9vliyj5ZkwouIyz0c7HgA4KYMu7U0M7/PBNjQZxlyM0ffPALn3pipjDw1NPIskTqetWXoIfB3MjGe2adgnjqqqKuj7YqoVlYj7ZOMszrlwnWkFZELfPG/PoY+Unnk+4KoG9nY7lUbycPUpHRZTBd56x9u0bVGx6chOkY3DD2eLIqaUo9v71Kmn1ExD6FPSQrDGCdSQoFyes6nmzoY5qepiWWKRDqro4IYHG+Rsomcmin4iJzcwt8mI6m2a5BXXSN24j6EhGkgxL5k0ElhNTTgXaGZBo45+aVNHl0Pa25RK6jvjjbFbndDDIo/RtMu2e4L4swy2agl4CSjk2x72E2M+ytxGONVRnlk+Tb50SM8kjsFVFUXLMTuAAxQVHIZVSRhtqsnY7HlLJqXfSMYqYrgNZ0yxHG+KLjN9N+hpISMuzK3vEE/GE/JiGbyLPcoc25aIfAul9qJ8V9OlTTTJ60cguNx0I6wd4POUT5vVJ/wBiD/XjIqCrr2PqF3HkyA++XxZDKmcRfUhBWf7omJxldfBVbKmxkRGu8fc63U4raaKqp5lNxJFModGHsIPNz9DLXlNY8uQ/774ppHpsjjfQzDdLU/Y9BOjySG2YKmtRl41c9uDE4kr8m2zpKu+eAd488c4VPkdAQbqaWlHJIy+ySxfGfVwhgP8AdaG6fGQv4po2iljYXV0cWKkcCMUNWwppG1lpZPPhfvKEXx4NvaG+r0ExvH+4bpzc0zmPKsp3kx8gringPsVvTOMso4qWLiRGtizdpjvPRyo0ckbi6sjCxUg6gjHg9nUdZQXYjlaUkTRKx7UZCvivpIauBx60U6B0PvB5mchsry8KbOpmB5SUfUTGY1cNJTp1GSZgovwA6zjK6GGkRiLF+TWxc9pzvPjygCkzPY1eikbzJP2TnETmCvp01no5d0qd/WvaAxW08dRTzxm6yRSqGVh7CD46PI62SBjoJjERH82Mmy+szK3EgCnX7jN0uZ5XPRyfXoZA1/unxQpUZc/dTTMsfyW8YFyTuAAxlG3Q5XwkAP4yo/bHGW7dDlV/XqpBaWUfUQ8ysgkp6iCQXSSKVSrIw4EHDnyjK6p/z9I+h+unoPiolL5DNJokzm70hPb1j8ZTL4/dJXQo2IsqpYQfZLMT/o6WHOZoR3SwE/6MQeFFUE9gNLAfHmkA/CkketJQyD+q9kk/wTFfOEL2ukMQ3yTP2I13nGW0ywoTYM51eR7evIxLNzaEPUZRVuPQm64nPVFNazYy+pMcsbXSWGaJuI0II1GKCHuGYwJ+fT+1Hrr4qyFoainmXaSRG6jisdZKlw8k0spS+yHkmZ2IW5sOlaRZRHIWQpKmkiOhDI4B1U4gJKQx3JLNq7s5LOx62Yk+KvjZMroWPuNRNwiTGYVDSzSv50kssh4D4AYziIGfjRUpsy0vf1y8+jhAnhG4ZnBHov69PUOMvqQ8ci3jmgmiPwIOoOIo/wCr9CHMAmrwdvraP8hqYiaHLEb3Caf6EPxfFW93dtyqo0RF0VF0AGN0+S5dMN8HCqmH0+uMdCiF56bdHDmYHwSfg+KCosyOGgqKeeI+5kdTi4ips+VPhWKP4oxPGskM0DiSKRGFwyMtwQeI6UC5J3AAY9CXNN0lDS/quqeT5MV023LNKxkllkbd/wDgGBabLsknH9Rwmqx9PhH0cMZWmzWBAWPCOoXSWPDm1PXQ3ko6n2xS2HvU2YYL3myqsvLSPxKrrG3aTDWBhr3Hkrt2Kncv79sOoZWU3BB3ggjokuPwflZEzB+E0noR4bTK6FyBIOFRJrNhyNsoLRQofXmkPmxp7TgIDy9r0tEeFKrfxT0tQtpaaqiEkbe5usag43v+B8wkJXugn/lJjfspUxlRIBqY39F19qkjANzRsRNSG5ufxMoZATjR6rLJjTuB+ql2wxwxtydfRSH5qblhhtEfMIYpD9mQg44x1UbD4HHF6mNR8ThdYzmVOZP3QxOI9Ysuo5Xv7EeURxnHqVWbz/5wQf8A3iW4NBR2paUqfVZIrbY+uTiX0KekhaaQjjZQbAdZxuf8FULiSrf2Sy70jxHYlIV852tbbkc3aR+LMSfyCS23T1kKTxkjQ7Lgi+HuQkR8rpLnjFKb/c+AfMFNOKaoI7SVGwuE1l8ileH3SoChwpIIIsQRzJCAskNDM0fve2yBgkXavqw7lOISm5XA1gh/oNL8hMmNxZKSFY9sjrcje59p/JuS/li2NrFh03//xAAUEQEAAAAAAAAAAAAAAAAAAABw/9oACAECAQE/AGH/xAAUEQEAAAAAAAAAAAAAAAAAAABw/9oACAEDAQE/AGH/2Q==",
                contentType: "image/jpeg"
            }
              
            };
            console.log(data);
    
            const jString = JSON.stringify(data);
    
            const response = await fetch("/register", {
                method: 'POST',
                body: jString,
                headers: {
                    'Content-type': 'application/json'
                }
            });
    
            if(response.status == 400 || response.status === 500) {
                console.log("failed");
            } else if (response.status == 200){ 
                document.getElementById("message").innerHTML = "Register Successful.";
                document.getElementById('message').style.color = "green";
                window.location.href = "/login";
                
            }
        }
    });
    
})