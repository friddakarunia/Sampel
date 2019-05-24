/* When the user clicks on the button, 
		toggle between hiding and showing the dropdown content */
		function myfung() {
		  document.getElementById("myDropdown").classList.toggle("show");
		}

		// Close the dropdown if the user clicks outside of it
		window.onclick = function(event) {
		  if (!event.target.matches('.menu-drop')) {
		    var dropdowns = document.getElementsByClassName("dropdown-content");
		    var i;
		    for (i = 0; i < dropdowns.length; i++) {
		      var openDropdown = dropdowns[i];
		      if (openDropdown.classList.contains('show')) {
		        openDropdown.classList.remove('show');
		      }
		    }
		  }
		}

		function tabfungsi(jenis) {
			  var i, tabcontent, tablinks;
			  tabcontent = document.getElementsByClassName("tab-jenis");
			  for (i = 0; i < tabcontent.length; i++) {
			    tabcontent[i].style.display = "none";
			  }
			  document.getElementById(jenis).style.display = "block";
			  // window.style.top="0";
			}

			// Get the element with id="defaultOpen" and click on it
			document.getElementById("default").click();
			// document.getElementById("halamanUtama").style.display="block";