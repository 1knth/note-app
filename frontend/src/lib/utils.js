export default function formattedDate(date) {
    date = new Date(date);
    return (
        date.toLocaleString('en-US', {
            month: "short",
            day:"numeric",
            year: "numeric",
            
            // hh:mm
            // timeStyle:'short' 
        })
    )
};

