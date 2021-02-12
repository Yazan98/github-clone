export function getColorCodeByLanguage(color = "") {
    if (color === "JavaScript") {
        return "#f1e05a";
    } else if (color === "Kotlin") {
        return "#F18E33";
    } else if (color === "Java") {
        return "#b07219";
    } else if (color === "TypeScript") {
        return "#2b7489";
    } else if (color === "Python") {
        return "#3572A5";
    } else if (color === "Ruby") {
        return "#701516";
    } else if (color === "Vue") {
        return "#2c3e50";
    } else {
        return "#f1e05a";
    }
}
