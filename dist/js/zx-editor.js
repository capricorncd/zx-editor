/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "7d9ed8f439d8fff3633c"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "zx-editor";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/js/index.js")(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_css-loader@0.28.11@css-loader/index.js??ref--5-1!./node_modules/_postcss-loader@2.1.3@postcss-loader/lib/index.js??postcss!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js??ref--5-3!./src/css/zx-editor.styl":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.11@css-loader??ref--5-1!./node_modules/_postcss-loader@2.1.3@postcss-loader/lib??postcss!./node_modules/_stylus-loader@3.0.2@stylus-loader??ref--5-3!./src/css/zx-editor.styl ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js */ \"./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".border-bottom:after{position:absolute;bottom:0;left:0;width:100%;content:'';border-top:1px solid #eee;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.zxeditor-container{display:block;margin:0;padding:0;width:100%;min-height:200px;}.zxeditor-container *{margin:0;padding:0;color:#555;-webkit-box-sizing:border-box;box-sizing:border-box}.zxeditor-container .zxeditor-content-wrapper{width:100%;min-height:200px;overflow:hidden;outline:none;}.zxeditor-container .zxeditor-content-wrapper p,.zxeditor-container .zxeditor-content-wrapper h1,.zxeditor-container .zxeditor-content-wrapper h2,.zxeditor-container .zxeditor-content-wrapper h3,.zxeditor-container .zxeditor-content-wrapper h4,.zxeditor-container .zxeditor-content-wrapper li{line-height:1.5em;padding:10px 0}.zxeditor-container .zxeditor-content-wrapper h2{font-size:1.2em;font-weight:800 !important}.zxeditor-container .zxeditor-content-wrapper h4{font-weight:800 !important}.zxeditor-container .zxeditor-content-wrapper blockquote{display:inline-block;padding-left:1em;border-left:3px solid #d0d0d0}.zxeditor-container .zxeditor-content-wrapper ul{padding-left:20px;list-style:disc}.zxeditor-container .zxeditor-content-wrapper li,.zxeditor-container .zxeditor-content-wrapper p{color:inherit}.zxeditor-container .zxeditor-content-wrapper hr{margin:0 20%;border:0;border-top:1px dashed #d0d0d0}.zxeditor-container .zxeditor-toolbar-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:9999;left:0;bottom:0;width:100%;height:48px;background-color:#fff;}.zxeditor-container .zxeditor-toolbar-wrapper:after{position:absolute;top:0;left:0;width:100%;content:'';border-top:1px solid #d0d0d0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.zxeditor-container .zxeditor-toolbar-wrapper .toolbar-item{-webkit-box-flex:1;-ms-flex:1;flex:1;height:48px;line-height:48px;text-align:center}.zxeditor-container .zxeditor-textstyle-wrapper{position:fixed;z-index:10000;left:0;bottom:0;width:100%;height:260px;background-color:#fff;overflow-y:auto;}.zxeditor-container .zxeditor-textstyle-wrapper .abs-bar-wrapper{position:fixed;z-index:1;bottom:212px;left:0;width:100%;height:48px;background-color:#eee;border-top:1px solid #d0d0d0;border-bottom:1px solid #d0d0d0;-webkit-box-sizing:border-box;box-sizing:border-box;}.zxeditor-container .zxeditor-textstyle-wrapper .abs-bar-wrapper .abs-bar-title{position:relative;line-height:48px;text-align:center;font-size:1.2em}.zxeditor-container .zxeditor-textstyle-wrapper .abs-bar-wrapper .abs-bar-btn{position:absolute;top:0;right:0;width:64px;height:48px;line-height:48px;text-align:center;color:#14b2e0;font-size:1em}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;margin-top:48px;height:50px;}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item{position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;line-height:50px;text-align:center;font-size:1.5em;}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item:nth-child(2):before{position:absolute;top:0;left:0;height:50px;content:'';border-left:1px solid #eee;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item:nth-child(2):after{position:absolute;top:0;right:0;height:50px;content:'';border-right:1px solid #eee;-webkit-transform:scaleX(.5);transform:scaleX(.5)}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item.text-bold{font-weight:800}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item.text-italic{font-style:italic !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-style-wrapper .style-item.through-line{text-decoration:line-through !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;height:50px;}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-item{-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative;height:50px;}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-item:before{position:absolute;top:50%;left:50%;margin:-14px 0 0 -14px;width:28px;height:28px;border-radius:50%;content:''}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-item:after{position:absolute;top:50%;left:50%;margin:-17px 0 0 -17px;width:34px;height:34px;border-radius:50%;-webkit-box-sizing:border-box;box-sizing:border-box;content:''}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-black:before{background-color:#555}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-gray:before{background-color:#d0d0d0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-red:before{background-color:#ff583d}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-yellow:before{background-color:#fdaa25}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-green:before{background-color:#44c67b}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-blue:before{background-color:#14b2e0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .color-purple:before{background-color:#b065e2}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-black:after{border:1px solid #555}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-gray:after{border:1px solid #d0d0d0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-red:after{border:1px solid #ff583d}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-yellow:after{border:1px solid #fdaa25}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-green:after{border:1px solid #44c67b}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-blue:after{border:1px solid #14b2e0}.zxeditor-container .zxeditor-textstyle-wrapper .text-color-wrapper .active.color-purple:after{border:1px solid #b065e2}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper{border-top:5px solid #eee;}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item{position:relative;margin:0 20px;height:48px;line-height:48px;text-align:center;}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item:after{position:absolute;bottom:0;left:0;width:100%;content:'';border-top:1px solid #eee;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item:last-child:after{border-top:0}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item > b{position:relative;display:inline-block;vertical-align:top;margin-right:8px;width:20px;height:48px;text-align:right;}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item > b:after{display:inline-block}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.big-hook{font-size:1.2em;font-weight:800 !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.small-hook{font-weight:800 !important}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.quote-hook b:after{font-size:2em;content:'\\\"';margin-top:8px}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item.unordered-hook b:after{font-size:1.5em;content:'\\\\B7'}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked{display:inline-block;position:absolute;z-index:1;top:18px;right:30px;width:16px;height:8px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:before,.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:after{display:inline-block;position:absolute;background-color:#14b2e0;content:''}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:before{top:0;left:0;width:2px;height:8px}.zxeditor-container .zxeditor-textstyle-wrapper .text-tag-wrapper .tag-item i.checked:after{bottom:0;left:0;width:14px;height:2px}.zxeditor-container .zxeditor-linkinput-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:10001;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.4);-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper{width:80%;background-color:#fefefe;border-radius:4px;overflow:hidden;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-title{height:3.5em;line-height:3.5em;text-align:center}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin:0 10px;border:1px solid #eee;border-radius:3px;background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input{position:relative;display:block;margin:0 5px;height:40px;line-height:40px;border:0;outline:none;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input:first-child{border-bottom:1px solid #eee}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input::-webkit-input-placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input:-ms-input-placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input::-ms-input-placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-group .link-input::placeholder{color:#d0d0d0}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin:1em 10px;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-footer button{display:inline-block;height:40px;line-height:40px;width:47%;text-align:center;background-color:#fff;border:1px solid #eee;border-radius:3px;letter-spacing:2px;-webkit-box-sizing:border-box;box-sizing:border-box;}.zxeditor-container .zxeditor-linkinput-wrapper .linkinput-wrapper .linkinput-footer button.disabled{color:#eee}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/css/zx-editor.styl?./node_modules/_css-loader@0.28.11@css-loader??ref--5-1!./node_modules/_postcss-loader@2.1.3@postcss-loader/lib??postcss!./node_modules/_stylus-loader@3.0.2@stylus-loader??ref--5-3");

/***/ }),

/***/ "./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js":
/*!*********************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/_style-loader@0.19.1@style-loader/lib/addStyles.js":
/*!*************************************************************************!*\
  !*** ./node_modules/_style-loader@0.19.1@style-loader/lib/addStyles.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(selector) {\n\t\tif (typeof memo[selector] === \"undefined\") {\n\t\t\tvar styleTarget = fn.call(this, selector);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[selector] = styleTarget;\n\t\t}\n\t\treturn memo[selector]\n\t};\n})(function (target) {\n\treturn document.querySelector(target)\n});\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/_style-loader@0.19.1@style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n\tif (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertInto + \" \" + options.insertAt.before);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\toptions.attrs.type = \"text/css\";\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\toptions.attrs.type = \"text/css\";\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/_style-loader@0.19.1@style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/_style-loader@0.19.1@style-loader/lib/urls.js":
/*!********************************************************************!*\
  !*** ./node_modules/_style-loader@0.19.1@style-loader/lib/urls.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/_style-loader@0.19.1@style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/css/zx-editor.styl":
/*!********************************!*\
  !*** ./src/css/zx-editor.styl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/_css-loader@0.28.11@css-loader??ref--5-1!../../node_modules/_postcss-loader@2.1.3@postcss-loader/lib??postcss!../../node_modules/_stylus-loader@3.0.2@stylus-loader??ref--5-3!./zx-editor.styl */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js??ref--5-1!./node_modules/_postcss-loader@2.1.3@postcss-loader/lib/index.js??postcss!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js??ref--5-3!./src/css/zx-editor.styl\");\nif(typeof content === 'string') content = [[module.i, content, '']];\n// Prepare cssTransformation\nvar transform;\n\nvar options = {\"hmr\":true}\noptions.transform = transform\n// add the styles to the DOM\nvar update = __webpack_require__(/*! ../../node_modules/_style-loader@0.19.1@style-loader/lib/addStyles.js */ \"./node_modules/_style-loader@0.19.1@style-loader/lib/addStyles.js\")(content, options);\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(/*! !../../node_modules/_css-loader@0.28.11@css-loader??ref--5-1!../../node_modules/_postcss-loader@2.1.3@postcss-loader/lib??postcss!../../node_modules/_stylus-loader@3.0.2@stylus-loader??ref--5-3!./zx-editor.styl */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js??ref--5-1!./node_modules/_postcss-loader@2.1.3@postcss-loader/lib/index.js??postcss!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js??ref--5-3!./src/css/zx-editor.styl\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {\n\t\t\tvar newContent = __webpack_require__(/*! !../../node_modules/_css-loader@0.28.11@css-loader??ref--5-1!../../node_modules/_postcss-loader@2.1.3@postcss-loader/lib??postcss!../../node_modules/_stylus-loader@3.0.2@stylus-loader??ref--5-3!./zx-editor.styl */ \"./node_modules/_css-loader@0.28.11@css-loader/index.js??ref--5-1!./node_modules/_postcss-loader@2.1.3@postcss-loader/lib/index.js??postcss!./node_modules/_stylus-loader@3.0.2@stylus-loader/index.js??ref--5-3!./src/css/zx-editor.styl\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.i, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t})(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//# sourceURL=webpack:///./src/css/zx-editor.styl?");

/***/ }),

/***/ "./src/js/debug.js":
/*!*************************!*\
  !*** ./src/js/debug.js ***!
  \*************************/
/*! exports provided: log, error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"error\", function() { return error; });\n/**\n * Created by zx1984 2018/3/21\n * https://github.com/zx1984\n */\n\nfunction log () {\n  for (let i = 0; i < arguments.length; i++) {\n    console.log(arguments[i])\n  }\n}\n\nfunction error () {\n  for (let i = 0; i < arguments.length; i++) {\n    console.error(arguments[i])\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/js/debug.js?");

/***/ }),

/***/ "./src/js/dom-core.js":
/*!****************************!*\
  !*** ./src/js/dom-core.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Create by zx1984\n * 2018/1/23 0023.\n * https://github.com/zx1984\n */\n// 添加样式\nHTMLElement.prototype.addClass = function (className) {\n  this.classList.add(className)\n}\n// 删除样式\nHTMLElement.prototype.removeClass = function (className) {\n  this.classList.remove(className)\n}\n\n// 包含某个样式\nHTMLElement.prototype.hasClass = function (className) {\n  let reg = new RegExp(`\\\\b(${className})\\\\b`)\n  return className && reg.test(this.className)\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  /**\n   * 创建DOM元素\n   * @param tag 标签名称\n   * @param opts 标签属性\n   * @returns {Element}\n   */\n  create (tag = 'div', opts) {\n    let elm = document.createElement(tag)\n    if (opts && opts instanceof Object) {\n      for (let key in opts) {\n        if (opts.hasOwnProperty(key)) {\n          elm.setAttribute(key, opts[key])\n        }\n      }\n    }\n    return elm\n  },\n\n  /**\n   * 设置已有DOM节点的标签（实际是改变DOM节点标签）\n   * @param oldElm DOM节点对象\n   * @param newTagName 新标签名称\n   * @returns {Element}\n   */\n  changeTagName (oldElm, newTagName) {\n    if (!newTagName || oldElm.nodeName === newTagName.toUpperCase()) {\n      return oldElm\n    }\n    // 新的dom对象\n    const el = this.create(newTagName)\n    // 获取元素class/id/style属性，并赋予新DOM对象\n    const className = oldElm.className\n    const id = oldElm.id\n    // 是否有自定义style样式\n    const style = oldElm.getAttribute('style')\n\n    // innerHTML\n    // let innerHTML = oldElm.innerHTML\n    // innerText\n    let innerText = oldElm.innerText\n    // blockquote\n    if (newTagName === 'blockquote') {\n      innerText = `<p style=\"color: inherit\">${innerText}</p>`\n    } else if (newTagName === 'ul') {\n      innerText = `<li style=\"color: inherit\">${innerText}</li>`\n    }\n\n    if (className) el.className = className\n    if (id) el.id = id\n    if (style) el.setAttribute('style', style)\n\n    el.innerHTML = innerText\n    return el\n  },\n\n  /**\n   * 查找当前元素节点(textNode、ElemNode等)，在context内的父根节点\n   * @param currentNode 当前DOM节点\n   * @param targetParent\n   * @returns {*}\n   */\n  closest (currentNode, context) {\n    let parentNode\n    do {\n      parentNode = currentNode.parentNode\n      if (parentNode === context) {\n        parentNode = null\n        break\n      } else {\n        currentNode = parentNode\n      }\n    } while (parentNode)\n    return currentNode\n  },\n\n  /**\n   * 判断元素innerText是否为空\n   * 如果元素内存在hr分割线，则不为空\n   * @param el\n   * @returns {boolean}\n   */\n  isInnerEmpty (el) {\n    return !el.innerHTML || el.innerHTML === '<br>'\n    // return !el.innerText.replace(/&nbsp;|\\s/ig, '') && !el.querySelectorAll('hr')[0] && !el.querySelectorAll('img')[0]\n  },\n\n  /**\n   * 对象是否为HTML元素节点对象\n   * @param obj\n   * @returns {Function}\n   */\n  // isHTMLElement (obj) {\n  //   return (typeof HTMLElement === 'object') ?\n  //     function (obj) {\n  //       return obj instanceof HTMLElement\n  //     } :\n  //     function (obj) {\n  //       return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'\n  //     }\n  // },\n\n  /**\n   * dom节点选择器\n   * @param selector 元素id、class、属性等\n   * @param context 作用域，默认为documet\n   * @returns {*}\n   */\n  query (selector, context = document) {\n    return context.querySelector(selector)\n  },\n\n  queryAll (selector, context = document) {\n    return context.querySelectorAll(selector)\n  },\n\n  /**\n   * 在当前元素节点el后插入新节点newNode\n   * @param el 当前元素节点\n   * @param newNode 要插入的新元素节点\n   */\n  insertAfter (el, newNode) {\n    const nextNode = el.nextElementSibling\n    const parentNode = el.parentNode\n    if (nextNode === null) {\n      parentNode.appendChild(newNode)\n    } else {\n      parentNode.insertBefore(newNode, nextNode)\n    }\n  },\n\n  /**\n   * 查找元素节点el的兄弟节点\n   * @param el\n   * @param 可选参数，className兄弟节点包含的样式名\n   * @returns {*}\n   */\n  siblings (el, className) {\n    let arr = []\n    let elmNodes = []\n    const siblings = el.parentNode.childNodes\n    // 只取元素节点\n    siblings.forEach((item) => {\n      if (item.nodeType === 1 && item !== el) {\n        elmNodes.push(item)\n      }\n    })\n\n    if (className) {\n      let reg = new RegExp(`\\\\b(${className})\\\\b`)\n      elmNodes.forEach((item) => {\n        if (reg.test(item.className)) {\n          arr.push(item)\n        }\n      })\n    } else {\n      arr = elmNodes\n    }\n    return arr.length ? arr : null\n  },\n\n  /**\n   * 创建a标签链接字符串\n   * @param url 链接地址\n   * @param name 链接名称\n   * @returns {string}\n   */\n  createLinkStr (url, name) {\n    if (!url) return ''\n    url = url + ''\n    name = name || (url.length > 20 ? url.substr(0, 20) + '...' : url)\n    return `<a href=\"${url}\" target=\"_blank\" alt=\"${name}\">${name}</a>`\n  },\n\n  /**\n   * 往字符串中插入字符串\n   * @param str 原字符串\n   * @param insertString 需要插入的字符串\n   * @param position 插入位置\n   * @returns {string}\n   */\n  insertStr (str, insertString, position) {\n    return str.substring(0, position) + insertString + str.substring(position)\n  },\n\n  /**\n   * 元素后面插入分割线\n   * @param el\n   */\n  insertHr (el) {\n    let p = this.isInnerEmpty(el) ? el : this.create('p')\n    p.innerHTML = '<hr>'\n    this.insertAfter(el, p)\n  },\n\n  // 获取当前元素节点最近的文本节点\n  getTextNode (el) {\n    while (el && el.nodeType === 1) {\n      // 当el.childNodes[0] == <br>时，不能继续获取childNode\n      if (el.childNodes[0]) {\n        el = el.childNodes[0]\n      } else {\n        break\n      }\n    }\n    return el\n  }\n});\n\n\n//# sourceURL=webpack:///./src/js/dom-core.js?");

/***/ }),

/***/ "./src/js/extend-methods.js":
/*!**********************************!*\
  !*** ./src/js/extend-methods.js ***!
  \**********************************/
/*! exports provided: toBlobData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toBlobData\", function() { return toBlobData; });\n/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ \"./src/js/debug.js\");\n/**\n * Created by zx1984 2018/4/6\n * https://github.com/zx1984\n */\n\n/**\n * 将image base64数据，转化为Bolb原始文件数\n * @param base64Data\n * @returns {*} Blob数据\n */\nfunction toBlobData (base64Data) {\n  // base64数据格式:\n  // \"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k=\"\n  let type, onlyData\n  if (/^data:(\\w+\\/\\w+);base64,(.+)/.test(base64Data)) {\n    type = RegExp.$1\n    onlyData = RegExp.$2\n  } else {\n    Object(_debug__WEBPACK_IMPORTED_MODULE_0__[\"error\"])('toBlobData(data), params\\'data is not base64 data!')\n    return null\n  }\n\n  let data = window.atob(onlyData)\n  let ia = new Uint8Array(data.length)\n  for (let i = 0; i < data.length; i++) {\n    ia[i] = data.charCodeAt(i)\n  }\n  return new Blob([ia], {type: type})\n}\n\n\n//# sourceURL=webpack:///./src/js/extend-methods.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: ZxEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ZxEditor\", function() { return ZxEditor; });\n/* harmony import */ var _css_zx_editor_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/zx-editor.styl */ \"./src/css/zx-editor.styl\");\n/* harmony import */ var _css_zx_editor_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_zx_editor_styl__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/js/util.js\");\n/* harmony import */ var _dom_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom-core */ \"./src/js/dom-core.js\");\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scroll */ \"./src/js/scroll.js\");\n/* harmony import */ var _extend_methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extend-methods */ \"./src/js/extend-methods.js\");\n/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./debug */ \"./src/js/debug.js\");\n/**\n * Create by zx1984\n * 2018/1/23 0023.\n * https://github.com/zx1984\n */\n\n\n\n\n\n\n\n// COLOR\nconst COLORS = {\n  black: '#333',\n  gray: '#d0d0d0',\n  red: '#ff583d',\n  yellow: '#fdaa25',\n  green: '#44c67b',\n  blue: '#14b2e0',\n  purple: '#b065e2'\n}\n\n// 工具栏高度\nconst TOOL_BAR_HEIGHT = 48 + 10\n// 字体样式选择层高度\nconst TEXT_STYLE_HEIGHT = 310 + 10\n\n// ZxEditor\nclass ZxEditor {\n  // constructor\n  constructor (selecotor = 'body') {\n    this.editor = null\n    this.toolbar = null\n    this.editbox = null\n    this.textstyle = null\n    this.textstyleIsShow = false\n    this.linkinput = null\n    // 编辑的内容\n    // this.content = null\n    // 光标对象\n    this.selection = null\n    this.range = null\n    this.rangeOffset = 0\n    this.rangeTimer = null\n    // 当前光标所在的元素节点NodeType === 1\n    this.rangeElm = null\n    this._initDoms(selecotor)\n  }\n\n  /**\n   * 初始化DOM节点\n   * @param selecotor Editor外层容器id或className\n   * @private\n   */\n  _initDoms (selecotor) {\n    // 外部容器\n    const outerWrapper = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].query(selecotor)\n\n    this.editor = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('div', {class: 'zxeditor-container'})\n    this.editbox = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('div', {class: 'zxeditor-content-wrapper', contenteditable: true, style: `margin-bottom: ${TOOL_BAR_HEIGHT}px`})\n    this.toolbar = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('div', {class: 'zxeditor-toolbar-wrapper'})\n    this.textstyle = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('div', {class: 'zxeditor-textstyle-wrapper', style: 'display: none'})\n\n    this.linkinput = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('div', {class: 'zxeditor-linkinput-wrapper', style: 'display: none'})\n\n    this.toolbar.innerHTML = `\n      <div class=\"toolbar-item pic-hook\">图片</div>\n      <div class=\"toolbar-item text-hook\">文字</div>\n      <div class=\"toolbar-item link-hook\">链接</div>\n      <div class=\"toolbar-item split-hook\">分割</div>\n      <!--<div class=\"toolbar-item reward-hook\">打赏</div>-->\n    `\n\n    this.textstyle.innerHTML = `\n      <div class=\"abs-bar-wrapper border-bottom\">\n        <div class=\"abs-bar-title\">样式</div>\n        <div class=\"abs-bar-btn\">完成</div>\n      </div>\n      <div class=\"text-style-wrapper border-bottom\">\n        <div class=\"style-item text-bold\" data-style=\"fontWeight:800\">B</div>\n        <div class=\"style-item text-italic\" data-style=\"fontStyle:italic\">I</div>\n        <div class=\"style-item through-line\" data-style=\"textDecoration:line-through\">abc</div>\n      </div>\n      <div class=\"text-color-wrapper border-bottom\">\n        <div class=\"color-item color-black\" data-color=\"\"></div>\n        <div class=\"color-item color-gray\" data-color=\"${COLORS.gray}\"></div>\n        <div class=\"color-item color-red\" data-color=\"${COLORS.red}\"></div>\n        <div class=\"color-item color-yellow\" data-color=\"${COLORS.yellow}\"></div>\n        <div class=\"color-item color-green\" data-color=\"${COLORS.green}\"></div>\n        <div class=\"color-item color-blue\" data-color=\"${COLORS.blue}\"></div>\n        <div class=\"color-item color-purple\" data-color=\"${COLORS.purple}\"></div>\n      </div>\n      <div class=\"text-tag-wrapper\">\n        <div class=\"tag-item big-hook\" data-tag=\"h2\">大标题</div>\n        <div class=\"tag-item small-hook\" data-tag=\"h4\">小标题</div>\n        <div class=\"tag-item normal-hook\" data-tag=\"p\">正文</div>\n        <div class=\"tag-item quote-hook\" data-tag=\"blockquote\"><b></b>引用</div>\n        <div class=\"tag-item unordered-hook\" data-tag=\"ul\"><b></b>无序列表</div>\n      </div>\n    `\n\n    this.linkinput.innerHTML = `\n      <div class=\"linkinput-wrapper\">\n        <div class=\"linkinput-title\">添加链接</div>\n        <div class=\"linkinput-group\">\n          <input type=\"text\" class=\"link-input\" name=\"zxeditorLinkurl\" placeholder=\"http(s)://\">\n          <input type=\"text\" class=\"link-input\" name=\"zxeditorLinkname\" placeholder=\"链接名称(选填)\">\n        </div>\n        <div class=\"linkinput-footer\">\n          <button class=\"cancel-hook\">取消</button>\n          <button class=\"submit-hook disabled\">确定</button>\n        </div>\n      </div>\n    `\n\n    this.editor.appendChild(this.editbox)\n    this.editor.appendChild(this.toolbar)\n    this.editor.appendChild(this.textstyle)\n    this.editor.appendChild(this.linkinput)\n    outerWrapper.appendChild(this.editor)\n\n    this._eventHandle()\n  }\n\n  /**\n   * 初始化文本框内容及当前光标元素\n   * @private\n   */\n  _initContentRang () {\n    if (!this.editbox.innerHTML) {\n      const p = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('p')\n      p.innerHTML = '<br>'\n      this.rangeElm = p\n      this.editbox.appendChild(p)\n      this._setRangePosition()\n    }\n  }\n\n  /**\n   * 显示文字样式设置\n   * @private\n   */\n  _textstyleShow () {\n    this.textstyle.style.display = 'block'\n    this.editbox.style.marginBottom = TEXT_STYLE_HEIGHT + 'px'\n    this.textstyleIsShow = true\n    this._initTextStyleCheck()\n    this.scrollToRange()\n  }\n\n  /**\n   * 隐藏文字样式设置\n   * @private\n   */\n  _textstyleHide () {\n    this.textstyle.style.display = 'none'\n    this.editbox.style.marginBottom = TOOL_BAR_HEIGHT + 'px'\n    this.textstyleIsShow = false\n    this.scrollToRange()\n    this._setRangePosition()\n  }\n\n  /**\n   * 操作事件绑定\n   */\n  _eventHandle () {\n    // 激活文本编辑框\n    this.editbox.addEventListener('click', (e) => {\n      this._initContentRang()\n      this._getRange(() => {\n        // this._initTextStyleCheck()\n      })\n      // 隐藏显示的文字样式设置容器\n      if (this.textstyleIsShow) {\n        this._textstyleHide()\n      }\n    }, false)\n\n    // 离开编辑输入框时，内容是否为空\n    // 为空则添加<br>\n    this.editbox.addEventListener('blur', (e) => {\n      if (this.rangeElm && !this.rangeElm.innerHTML) {\n        this.rangeElm.innerHTML = '<br>'\n      }\n    }, false)\n\n    // 文本编辑框内容输入\n    this.editbox.addEventListener('keyup', () => {\n      this._getRange()\n      this.scrollToRange()\n    }, false)\n\n    // 操作工具栏，上传图片、文字样式设置等\n    this.toolbar.addEventListener('click', (e) => {\n      const el = e.target\n      // 判断内容是否为空，\n      // 即用户是否有激活过文本输入框\n      this._initContentRang()\n\n      // 文字\n      if (el.hasClass('text-hook')) {\n        this._textstyleShow()\n      }\n\n      // 链接\n      if (el.hasClass('link-hook')) {\n        if (this.rangeElm.nodeName === 'P') {\n          this.linkinput.style.display = 'flex'\n        } else {\n          alert('只支持在正文中插入链接！')\n        }\n      }\n\n      // 分割线\n      if (el.hasClass('split-hook')) {\n        _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].insertHr(this.rangeElm)\n      }\n\n      // 打赏\n      if (el.hasClass('reward-hook')) {\n        alert('开发中')\n      }\n    }, false)\n\n    // 文字样式选项控制\n    this.textstyle.addEventListener('click', (e) => {\n      const el = e.target\n      // 字体标签\n      if (el.hasClass('tag-item')) {\n        this._tagnameHandle(el)\n      }\n      // 字体样式\n      if (el.hasClass('style-item')) {\n        this._textStyleHandle(el)\n      }\n      // 字体颜色\n      if (el.hasClass('color-item')) {\n        this._textColorHandle(el)\n      }\n      // 关闭字体样式设置层\n      if (el.hasClass('abs-bar-btn')) {\n        this._textstyleHide(el)\n      }\n    })\n\n    // 滑动文字样式设置层时，禁用document滑动\n    this.textstyle.addEventListener('touchmove', (e) => {\n      _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].queryAll('body')[0].style.overflow = 'hidden'\n    })\n    this.textstyle.addEventListener('touchend', (e) => {\n      _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].queryAll('body')[0].style.overflow = ''\n    })\n\n    // 链接：输入容器按钮\n    const submitBtn = this.linkinput.querySelector('.submit-hook')\n    const cancelBtn = this.linkinput.querySelector('.cancel-hook')\n    const linkInputs = this.linkinput.querySelectorAll('input')\n    // 确定\n    submitBtn.addEventListener('click', (e) => {\n      const el = e.target\n      // const className = el.className\n      if (el.hasClass('disabled')) return\n      // 创建url，并添加至焦点出\n      let linkStr = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createLinkStr(linkInputs[0].value, linkInputs[1].value)\n      // 获取焦点在段落中的位置\n      const position = this.range ? this.range.startOffset : 0\n      if (this.rangeElm.nodeName === 'P') {\n        this.rangeElm.innerHTML = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].insertStr(this.rangeElm.innerText, linkStr, position)\n        this.linkinput.style.display = 'none'\n      }\n    }, false)\n    // 取消\n    cancelBtn.addEventListener('click', () => {\n      this.linkinput.style.display = 'none'\n    }, false)\n\n    // 链接输入框\n    linkInputs[0].addEventListener('keyup', (e) => {\n      let val = e.target.value\n      if (_util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].isHttpUrl(val)) {\n        if (submitBtn.hasClass('disabled')) {\n          submitBtn.removeClass('disabled')\n        }\n      }\n    }, false)\n  }\n\n  /**\n   * 元素文字style样式处理\n   * @param el 样式按钮对象\n   * @private\n   */\n  _textStyleHandle (el) {\n    const value = el.getAttribute('data-style')\n    let style = value.split(':')\n    let key = style[0]\n    if (this.rangeElm.style[key] === style[1]) {\n      this.rangeElm.style[key] = ''\n    } else {\n      this.rangeElm.style[key] = style[1]\n    }\n    this._setRangePosition()\n  }\n\n  /**\n   * 元素文字Color处理\n   * @param el 颜色按钮对象\n   * @private\n   */\n  _textColorHandle (el) {\n    const value = el.getAttribute('data-color')\n    this.rangeElm.style.color = value\n    el.addClass('active')\n    let siblings = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].siblings(el, 'active') || []\n    siblings.forEach((item) => {\n      item.removeClass('active')\n    })\n    this._setRangePosition()\n  }\n\n  /**\n   * 标签样式处理\n   * @param el 标签按钮对象\n   * @private\n   */\n  _tagnameHandle (el) {\n    const TAG_ITEMS = {\n      'big': 'h2',\n      'small': 'h4',\n      'normal': 'p',\n      'quote': 'blockquote',\n      'unordered': 'ul'\n    }\n\n    const className = el.className\n\n    if (el.querySelector('.checked') === null) {\n      this._appendCheckedIcon(el)\n      // 去掉兄弟节点上的选中符号\n      let siblings = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].siblings(el) || []\n      siblings.forEach((item) => {\n        this._removeCheckedIcon(item)\n      })\n      // 给当前焦点元素节点，添加样式\n      let tag = 'p'\n      let tagMatch = className.match(/\\b(\\w+?)-hook\\b/)\n      if (tagMatch && tagMatch[1]) {\n        try {\n          tag = TAG_ITEMS[tagMatch[1]]\n        } catch (e) {}\n      }\n      // this.log(this.range)\n      let newElm = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].changeTagName(this.rangeElm, tag)\n      _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].insertAfter(this.rangeElm, newElm)\n      this.editbox.removeChild(this.rangeElm)\n      this.rangeElm = newElm\n      this._setRangePosition(this.rangeElm)\n    }\n  }\n\n  /**\n   * 初始化文字样式选项\n   * @private\n   */\n  _initTextStyleCheck () {\n    if (!this.textstyleIsShow) return\n    // 初始化节点类型 ****************************************\n    // 检查当前焦点DOM节点类型\n    let tagName = this.rangeElm.tagName.toLowerCase()\n    // this.log('this.rangeElm.tagName: ' + tagName)\n    let tagList = this.textstyle.querySelectorAll('.tag-item') || []\n    tagList.forEach((item) => {\n      let tag = item.getAttribute('data-tag')\n      if (tag === tagName) {\n        this._appendCheckedIcon(item)\n      } else {\n        this._removeCheckedIcon(item)\n      }\n    })\n\n    // 初始化文字颜色选 ****************************************\n    let color = this.rangeElm.style.color\n    if (/rgb\\(/.test(color)) {\n      // 十进制转十六进制\n      color = _util__WEBPACK_IMPORTED_MODULE_1__[\"default\"].rgbToHex(color)\n    }\n    // 获取颜色选项节点列表\n    let colorList = this.textstyle.querySelectorAll('.color-item') || []\n    colorList.forEach(item => {\n      let tag = item.getAttribute('data-color')\n      if (tag === color) {\n        item.addClass('active')\n      } else {\n        item.removeClass('active')\n      }\n    })\n    // 标记焦点位置\n    this._setRangePosition()\n  }\n\n  /**\n   * 添加一个checked图标\n   * @param el\n   * @private\n   */\n  _appendCheckedIcon (el) {\n    if (el.querySelector('.checked')) return\n    // 字体样式选中符号\n    const ICON_CHECKED = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('i', {class: 'checked'})\n    el.appendChild(ICON_CHECKED)\n  }\n\n  /**\n   * 移除checked图标\n   * @param el\n   * @private\n   */\n  _removeCheckedIcon (el) {\n    let checkedNode = el.querySelector('.checked')\n    if (checkedNode)\n      el.removeChild(checkedNode)\n  }\n\n  /**\n   * 创建图片随机id\n   * @param prefix id前缀\n   * @returns {string}\n   * @private\n   */\n  _randId (prefix = '') {\n    return 'zxEditor_' + prefix + (+new Date)\n  }\n\n  /**\n   * 添加图片到编辑器中\n   * @param src 图片URL地址或base64数据\n   */\n  addImage (src) {\n    const id = this._randId('img_')\n    const img = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('img', { src: src, width: '100%', height: 'auto', id: id })\n    let p = null\n    if (_dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isInnerEmpty(this.rangeElm)) {\n      p = this.rangeElm\n      p.innerHTML = ''\n    } else {\n      p = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('p')\n      _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].insertAfter(this.rangeElm, p)\n      this.rangeElm = p\n    }\n    p.appendChild(img)\n\n    // 结尾插入的话，新增一段\n    if (this.editbox.lastElementChild === p) {\n      this._insertEmptyParagraph()\n    } else {\n      this.rangeElm = p.nextElementSibling\n      this.rangeOffset = 0\n      this._setRangePosition(this.rangeElm)\n    }\n    // 300毫秒后，文档高度跳转至焦点位置\n    let timer = setTimeout(() => {\n      this.scrollToRange()\n      if (timer) clearTimeout(timer)\n    }, 300)\n  }\n\n  /**\n   * 获取光标及当前光标所在的DOM元素节点\n   * @private\n   */\n  _getRange () {\n    // 获取选定对象\n    this.selection = getSelection()\n    // 设置最后光标对象\n    this.range = this.selection.getRangeAt(0)\n    this.rangeOffset = this.range.startOffset\n    // 当前Node\n    let currentNode = this.range.endContainer\n    this.rangeElm = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].closest(currentNode, this.editbox)\n  }\n\n  /**\n   * 设置或创建光标位置\n   * @param el\n   * @private\n   */\n  _setRangePosition (el) {\n    if (this.selection === null) {\n      this.selection = getSelection()\n      this.range = new Range()\n      this.rangeOffset = 0\n    } else {\n      // 清除选定对象的所有光标对象\n      this.selection.removeAllRanges()\n    }\n    // 光标移动到到原来的位置加上新内容的长度\n    if (el) {\n      this.range.setStart(_dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getTextNode(el), this.rangeOffset)\n    }\n    // 光标开始和光标结束重叠\n    this.range.collapse(true)\n\n    if (this.rangeTimer) clearTimeout(this.rangeTimer)\n    // 延时执行，键盘自动收起后再触发focus\n    this.rangeTimer = setTimeout(() => {\n      // 插入新的光标对象\n      this.selection.addRange(this.range)\n      if (this.rangeTimer) clearTimeout(this.rangeTimer)\n      this.rangeTimer = null\n    }, 100)\n  }\n\n  /**\n   * 插入空行\n   * @private\n   */\n  _insertEmptyParagraph () {\n    const p = _dom_core__WEBPACK_IMPORTED_MODULE_2__[\"default\"].create('p')\n    p.innerHTML = '<br>'\n    this.editbox.appendChild(p)\n    this.rangeElm = p\n    this.rangeOffset = 0\n    this._setRangePosition(p)\n  }\n\n  /**\n   * 滚动至顶部\n   */\n  scrollToTop () {\n    let winHeight = window.innerHeight\n    _scroll__WEBPACK_IMPORTED_MODULE_3__[\"default\"].to(0, _scroll__WEBPACK_IMPORTED_MODULE_3__[\"default\"].height() - winHeight)\n  }\n\n  /**\n   * 滚动至焦点可视区域\n   */\n  scrollToRange () {\n    let winHeight = window.innerHeight\n    let scrollTop = _scroll__WEBPACK_IMPORTED_MODULE_3__[\"default\"].top()\n    let rect = this.rangeElm.getBoundingClientRect()\n    // fixed(ToolBar 或者 TEXT样式设置)层的高度\n    let fixedHeight = this.textstyleIsShow ? TEXT_STYLE_HEIGHT : TOOL_BAR_HEIGHT\n    let scrollPostion = rect.bottom - (winHeight - fixedHeight)\n\n    if (scrollPostion > 0) {\n      _scroll__WEBPACK_IMPORTED_MODULE_3__[\"default\"].to(0, scrollTop + scrollPostion)\n    } else if (rect.top < 0) {\n      _scroll__WEBPACK_IMPORTED_MODULE_3__[\"default\"].to(0, scrollTop + rect.top)\n    }\n  }\n\n\n  /**\n   * 将image base64数据，转化为Bolb原始文件数\n   * @param base64Data\n   * @returns {*}\n   */\n  toBlobData (base64Data) {\n    return Object(_extend_methods__WEBPACK_IMPORTED_MODULE_4__[\"toBlobData\"])(base64Data)\n  }\n\n  /**\n   * 获取正文中的base64图片\n   * @returns {Array}\n   */\n  getBase64Images () {\n    let arr = []\n    const imgs = this.editbox.querySelectorAll('img')\n    for (let i = 0; i < imgs.length; i++) {\n      let img = imgs[i]\n      if (/^data:.+?;base64,/.test(img.src)) {\n        arr.push({\n          id: img.id,\n          data: img.src\n        })\n      }\n    }\n    return arr\n  }\n\n  /**\n   * 设置指定id图片src\n   * @param id\n   * @param src\n   * @returns {boolean}\n   */\n  setImageSrc (id, src) {\n    let img = this.editbox.querySelector('#' + id)\n    if (img) {\n      img.src = src\n      return true\n    }\n    return false\n  }\n\n  /**\n   * 获取正文内容(html代码)\n   */\n  getContent () {\n    return this.editbox.innerHTML\n  }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/scroll.js":
/*!**************************!*\
  !*** ./src/js/scroll.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Created by zx1984 2018/3/21\n * https://github.com/zx1984\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  top () {\n    return (window.pageYOffset !== undefined)\n      ? window.pageYOffset\n      : (document.documentElement.scrollTop || document.body.scrollTop)\n  },\n\n  height () {\n    return (document.documentElement || document.body).scrollHeight\n  },\n\n  to (x, y) {\n    (document.documentElement || document.body.parentNode || document.body).scrollTo(x, y)\n  },\n\n  left () {\n    return (window.pageXOffset !== undefined)\n      ? window.pageXOffset\n      : (document.documentElement || document.body.parentNode || document.body).scrollLeft\n  }\n});\n\n\n//# sourceURL=webpack:///./src/js/scroll.js?");

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Create by zx1984\n * 2018/1/24 0024.\n * https://github.com/zx1984\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  // 转换为整数\n  int (n) {\n    let num = parseInt(n)\n    return isNaN(num) ? 0 : num\n  },\n  trim (str) {\n    return str ? str.toString().replace(/^\\s+|\\s+$/g, '') : ''\n  },\n  // 十进制转十六进制\n  toHex (num) {\n    const HEX_CODE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']\n    let hex = []\n    // 余数\n    let surplus = 0\n    // 商\n    let quotient = num\n    do {\n      surplus = HEX_CODE[quotient % 16]\n      hex.unshift(surplus)\n      quotient = Math.floor(quotient / 16)\n    } while (quotient)\n\n    return hex.length === 1 ? '0' + hex[0] : hex.join('')\n  },\n  // rgb(68, 198, 123)\n  rgbToHex (rgb) {\n    let hex = ''\n    if (/rgb\\((\\d+)\\D+?(\\d+)\\D+?(\\d+)/.test(rgb)) {\n      hex += this.toHex(RegExp.$1)\n      hex += this.toHex(RegExp.$2)\n      hex += this.toHex(RegExp.$3)\n    }\n    return hex ? '#' + hex : rgb\n  },\n  // 是否为http(s)链接\n  isHttpUrl (url) {\n    return url && /^(http|https):\\/\\//i.test(url.toString())\n  }\n});\n\n\n//# sourceURL=webpack:///./src/js/util.js?");

/***/ })

/******/ });