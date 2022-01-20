
import trilaterate from "./Trilateration";
import utils from "./utils";
function frankenLateration(vectors){
	let solutionSet = []
	let set = []
	vectors.forEach(function(vector){
		set.push(vector)
		if(set.length>2){
			console.log('trilaterating:')
			console.log(set[set.length-3],set[set.length-2],set[set.length-1])
			if(solutionSet.length>1){
				trilaterate(set[set.length-3],set[set.length-2],set[set.length-1])		
			}
			solutionSet.push(trilaterate(set[set.length-3],set[set.length-2],set[set.length-1]))
		}
	})
	solutionSet = solutionSet.filter(function(el){
		if(el){ return true}
	})
	let distance_threshold = 5
	let checked_sets =[]

	function doesMatch(p1, p2){
		if(utils.distance(p1, p2)<=distance_threshold){
			return true
		}
	}
	let matches = []
	solutionSet.forEach(function(solutionPair, i){
		solutionPair.forEach(function(solution){
			if(solutionSet[i+1]){
				solutionSet[i+1].forEach(function(nextSolution){
					if(doesMatch(solution, nextSolution)){
						console.log('found match:', solution, nextSolution)
						matches.push(solution, nextSolution)
					}
				})
			}
		})
	})
	return matches
}
export default frankenLateration;
 