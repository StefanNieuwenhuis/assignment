import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import "./style.scss";

let template = require("./search.component.handlebars");

/**
 * Class representing a SearchComponent
 */
class SearchComponent {

    /**
     * Create a component called SearchComponent
     * @param {string} container - DOM container id to bind Handlebars template to
     */
    constructor(container) {
        this.container = container;

        this.bindAutocompleteToDomContainer();
        this.bindHandlebarsTemplateToDom();
    }

    /**
     * Bind autocomplete event to the search input field to enable search suggestions
     */
    bindAutocompleteToDomContainer() {
        // When the DOM is ready...
        $(() => {
            // Bind autocomple event to the searchbox
            // This enables the application to generate search suggestions
            $("#searchfield").autocomplete({
                source: (request, response) => {
                    $.ajax({
                        url: `${window.location.protocol}//zoeksuggesties.s-bol.com/extern/qs/OpenSearchJSCB/search_suggestions_callback/media_all/${encodeURIComponent(request.term)}`,
                        cache: true,
                        dataType: "jsonp",
                        jsonp: false,
                        jsonpCallback: "search_suggestions_callback",
                        success: (data) => {
                            let suggestions = [];
                            data[1].forEach(suggestion => { suggestions.push(suggestion); });
                            response(suggestions);
                        },
                        error: (error) => response([])
                    });
                }
            });
        });
    }

    /**
     * Bind handlebars template to DOM element
     */
    bindHandlebarsTemplateToDom() {
        $(this.container).html(template());
    }

}
export default SearchComponent;